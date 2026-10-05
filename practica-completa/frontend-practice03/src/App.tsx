import CharacterGrid from './components/CharacterGrid'

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex justify-between items-center px-8 py-4 bg-white border-b shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold text-slate-800">Rick & Morty Explorer</h1>
      </header>
      <main>
        <CharacterGrid />
      </main>
    </div>
  )
}

export default App
