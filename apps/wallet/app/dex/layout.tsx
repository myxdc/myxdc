import Tabs from './Tabs'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6">
      <Tabs />
      {children}
    </div>
  )
}
