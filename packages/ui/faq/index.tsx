import { Container } from '../container'
import { Typography } from '../typography'
import { FaqItem } from './item'

interface FaqProps {
  data: {
    question: string
    answer: string
  }[]
  label?: string
  title?: string
  description?: string | React.ReactNode
}

export const Faq = ({ data, label = 'FAQ', title = 'Frequently Asked Questions', description }: FaqProps) => {
  return (
    <Container className="relative z-10 max-w-6xl p-6 mx-auto mt-6 mb-0 space-y-6 bg-white border rounded-lg shadow-2xl">
      <header className="flex justify-between">
        <Typography weight={700} className="text-primary-700">
          {label}
        </Typography>
        <div className="text-right">
          <Typography variant="h2" as="h1" weight={600}>
            {title}
          </Typography>
          <Typography variant="p" className="mt-2">
            {description}
          </Typography>
        </div>
      </header>
      <div className="mt-16">
        {data?.map((item, index) => (
          <FaqItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </Container>
  )
}
