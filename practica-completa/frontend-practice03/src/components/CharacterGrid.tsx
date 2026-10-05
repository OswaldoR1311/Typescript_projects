import { useState } from 'react'
import { useCharacters } from '../hooks/useCharacter'
import type { Character } from '../types/character'
import { Card, CardContent, CardHeader, CardTitle } from '../../@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../@/components/ui/dialog'
import { Input } from '../../@/components/ui/input'
import { Button } from '../../@/components/ui/button'
import { ChevronLeft, ChevronRight, Loader2, Search } from 'lucide-react'

const CharacterGrid: React.FC = () => {
  const { characters, info, page, setPage, loading, error, search, setSearch } = useCharacters()
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)

  if (loading && characters.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-100">
        <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-100 text-red-500 font-medium">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-8 px-4 py-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 text-center">Rick and Morty Characters</h2>
      <div className="flex justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-" />
          <Input type="text" placeholder="Search character by name..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-white shadow-sm" />
        </div>
      </div>

      {loading && characters.length === 0
        ? (
            <div className="flex justify-center items-center min-h-75">
              <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
            </div>
          )
        : error && characters.length === 0
          ? (
              <div className="flex justify-center items-center min-h-75 text-slate-500 font-medium">
                {error}
              </div>
            )
          : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {characters.map(character => (
                    <Card onClick={() => setSelectedCharacter(character)} key={character.id} className="overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow bg-white">
                      <div>
                        <img src={character.image} alt={character.name} className="w-full h-56 object-cover" />
                        <CardHeader className="p-4 pb-2">
                          <div className="flex justify-between items-start gap-2">
                            <CardTitle className="text-base truncate" title={character.name}>
                              {character.name}
                            </CardTitle>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0 ${character.status === 'Alive'
                              ? 'bg-green-100 text-green-700'
                              : character.status === 'Dead' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                            }`}
                            >
                              {character.status}
                            </span>
                          </div>
                        </CardHeader>
                      </div>
                      <CardContent className="p-4 pt-0 text-sm text-slate-500 space-y-1">
                        <p>
                          <span className="font-semibold text-slate-700">Species:</span>
                          {character.species}
                        </p>
                        <p>
                          <span className="font-semibold text-slate-700">Gender:</span>
                          {character.gender}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {/* Paginación */}
                {info && (
                  <div className="flex justify-center items-center gap-4 py-6">
                    <Button onClick={() => setPage(prev => prev - 1)} className="cursor-pointer gap-1" variant="outline" disabled={!info.prev || loading}>
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <span className="text-sm font-medium text-slate-700">
                      Page
                      {' '}
                      {page}
                      {' '}
                      of
                      {' '}
                      {info.pages}
                    </span>
                    <Button variant="outline" disabled={!info || loading} onClick={() => setPage(prev => prev + 1)} className="cursor-pointer gap-1">
                      Next
                      {' '}
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
      {/* Dialog */}
      <Dialog open={!!selectedCharacter} onOpenChange={() => setSelectedCharacter(null)}>
        {selectedCharacter && (
          <DialogContent className="sm:max-w-md bg-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                {selectedCharacter.name}
              </DialogTitle>
              <DialogDescription>Detailed information about this character</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-center mt-2">
              <img
                src={selectedCharacter.image}
                alt={selectedCharacter.name}
                className="w-32 h-32 rounded-lg object-shadow object-cover "
              />
              <div className="space-y-2 text-sm text-slate-600 w-full">
                <p>
                  <span className="font-semibold text-slate-800">Status:</span>
                  {' '}
                  {selectedCharacter.status}
                </p>
                <p>
                  <span className="font-semibold text-slate-800">Species:</span>
                  {' '}
                  {selectedCharacter.species}
                </p>
                <p>
                  <span className="font-semibold text-slate-800">Gender:</span>
                  {' '}
                  {selectedCharacter.gender}
                </p>
                <p>
                  <span className="font-semibold text-slate-800">Origin:</span>
                  {' '}
                  {selectedCharacter.origin.name}
                </p>
                <p>
                  <span className="font-semibold text-slate-800">Location:</span>
                  {' '}
                  {selectedCharacter.location.name}
                </p>
                <p>
                  <span className="font-semibold text-slate-800">Episodes featured:</span>
                  {' '}
                  {selectedCharacter.episode.length}
                </p>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}

export default CharacterGrid
