export interface Inputs {
  templatePath?: string
  ctrfPath: string
  summary: boolean
  pullRequest: boolean
  summaryReport: boolean
  testReport: boolean
  testListReport: boolean
  failedReport: boolean
  failRateReport: boolean
  flakyReport: boolean
  flakyRateReport: boolean
  failedFoldedReport: boolean
  previousResultsReport: boolean
  aiReport: boolean
  skipedReport: boolean
  suiteFoldedReport: boolean
  suiteListReport: boolean
  pullRequestReport: boolean
  customReport: boolean
  artifactName: string
  annotate: boolean
  title: string
  onFailOnly: boolean
  exitOnFail: boolean
  useSuiteName: boolean
  previousResultsMax: number
  metricsReportsMax: number
  fetchPreviousResults: boolean
  updateComment: boolean
  overwriteComment: boolean
  commentTag: string
  groupBy: 'suite' | 'filePath'
  alwaysGroupBy: boolean
  debug: boolean
}
