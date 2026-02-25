import { z } from 'zod'

export type FormattedZodIssue = ReturnType<typeof zodIssuesFormatter>[number]

export default function zodIssuesFormatter(issues: z.core.$ZodIssue[]) {
  return issues.map((issue) => ({
    code: issue.code,
    path: issue.path.filter((p): p is string | number => typeof p !== 'symbol'),
    message: issue.message,
  }))
}
