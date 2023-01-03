import Tabs from './Tabs'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <Tabs />
      {children}
    </div>
  )
}
