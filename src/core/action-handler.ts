process.env.RUN_MODE = 'action'

import * as core from '@actions/core'

import { exitActionOnFail, getAllGitHubContext, handleError } from '../github'
import { getInputs } from './inputs'
import { prepareReport } from '../ctrf'
import { handleViewsAndComments, handleAnnotations } from '../github/handler'

export async function runAction(): Promise<void> {
  try {
    const inputs = getInputs()
    const githubContext = getAllGitHubContext()

    const report = await prepareReport(inputs, githubContext)

    // Add summary stats
    const summaryStats = `
## Summary
- Total Tests: ${report.results.summary.tests}
- Passed: ${report.results.summary.passed}
- Failed: ${report.results.summary.failed}
- Skipped: ${report.results.summary.skipped}
`

    // Create table rows for test results
    const tableRows = [
      ['Status', 'Test Name', 'Duration', 'Flaky', 'Message'],
      ...report.results.tests
        .filter(t => t.status !== 'passed')
        .map(test => {
          let emoji = '❔'

          switch (test.status) {
            case 'passed':
              emoji = '✅'
              break
            case 'failed':
              emoji = '❌'
              break
            case 'skipped':
              emoji = '⏭️'
              break
          }

          return [
            `${emoji}`,
            test.name,
            test.flaky ? 'Yes' : 'No',
            `${test.duration}ms`,
            test.message || '-'
          ]
        })
    ]

    await core.summary
      .addHeading('Test Results')
      .addRaw(summaryStats)
      .addTable(tableRows)
      .write({ overwrite: true })

    await handleViewsAndComments(inputs, report)
    handleAnnotations(inputs, report)

    if (inputs.exitOnFail) {
      exitActionOnFail(report)
    }
  } catch (error) {
    handleError(error)
  }
}
