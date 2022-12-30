export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">{children}</div>
    </div>
  )
}
