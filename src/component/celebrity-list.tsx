// 'use client'

// import { useState, useEffect } from 'react'
// import { Celebrity } from '@/types/celebrity'
// import { CelebrityItem } from './celebrity-item'

// interface CelebrityListProps {
//   searchQuery: string
//   initialCelebrities: Celebrity[]
// }

// export function CelebrityList({ searchQuery, initialCelebrities }: CelebrityListProps) {
//   const [celebrities, setCelebrities] = useState<Celebrity[]>(initialCelebrities)
//   const [expandedId, setExpandedId] = useState<number | null>(null)
//   const [editingId, setEditingId] = useState<number | null>(null)

//   const filteredCelebrities = celebrities.filter(celebrity => 
//     celebrity.first.toLowerCase().includes(searchQuery.toLowerCase())
//   )

//   const visibleCelebrities = filteredCelebrities.slice(0, 3)

//   const handleDelete = (id: number) => {
//     if (window.confirm('Are you sure you want to delete this celebrity?')) {
//       setCelebrities(prev => prev.filter(celebrity => celebrity.id !== id))
//     }
//   }

//   const handleUpdate = (id: number, updatedData: Partial<Celebrity>) => {
//     setCelebrities(prev => prev.map(celebrity => 
//       celebrity.id === id ? { ...celebrity, ...updatedData } : celebrity
//     ))
//     setEditingId(null)
//   }

//   return (
//     <div className="space-y-4">
//       {visibleCelebrities.map(celebrity => (
//         <CelebrityItem
//           key={celebrity.id}
//           celebrity={celebrity}
//           isExpanded={expandedId === celebrity.id}
//           isEditing={editingId === celebrity.id}
//           onToggle={() => {
//             if (editingId === null) {
//               setExpandedId(expandedId === celebrity.id ? null : celebrity.id)
//             }
//           }}
//           onEdit={() => setEditingId(celebrity.id)}
//           onCancelEdit={() => setEditingId(null)}
//           onDelete={() => handleDelete(celebrity.id)}
//           onUpdate={(data) => handleUpdate(celebrity.id, data)}
//         />
//       ))}
//       {filteredCelebrities.length > 3 && (
//         <p className="text-center text-gray-500">
//           {filteredCelebrities.length - 3} more celebrities found
//         </p>
//       )}    
//     </div>
//   )
// }
'use client'

import { useState } from 'react'
import { Celebrity } from '@/types/celebrity'
import { CelebrityItem } from './celebrity-item'
import { DeleteDialog } from './delete-dialog'

interface CelebrityListProps {
  searchQuery: string
  initialCelebrities: Celebrity[]
}

export function CelebrityList({ searchQuery, initialCelebrities }: CelebrityListProps) {
  const [celebrities, setCelebrities] = useState<Celebrity[]>(initialCelebrities)
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const filteredCelebrities = celebrities.filter(celebrity => 
    celebrity.first.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const visibleCelebrities = filteredCelebrities.slice(0, 3)

  const handleDelete = (id: number) => {
    setDeleteId(id)
  }

  const confirmDelete = () => {
    if (deleteId) {
      setCelebrities(prev => prev.filter(celebrity => celebrity.id !== deleteId))
      setDeleteId(null)
    }
  }

  const handleUpdate = (id: number, updatedData: Partial<Celebrity>) => {
    setCelebrities(prev => prev.map(celebrity => 
      celebrity.id === id ? { ...celebrity, ...updatedData } : celebrity
    ))
    setEditingId(null)
  }

  return (
    <div className="w-full space-y-4">
      {visibleCelebrities.map(celebrity => (
        <CelebrityItem
          key={celebrity.id}
          celebrity={celebrity}
          isExpanded={expandedId === celebrity.id}
          isEditing={editingId === celebrity.id}
          onToggle={() => {
            if (editingId === null) {
              setExpandedId(expandedId === celebrity.id ? null : celebrity.id)
            }
          }}
          onEdit={() => setEditingId(celebrity.id)}
          onCancelEdit={() => setEditingId(null)}
          onDelete={() => handleDelete(celebrity.id)}
          onUpdate={(data) => handleUpdate(celebrity.id, data)}
        />
      ))}
      {filteredCelebrities.length > 3 && (
        <p className="text-center text-gray-500">
          {filteredCelebrities.length - 3} more celebrities found
        </p>
      )}
      <DeleteDialog 
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}


