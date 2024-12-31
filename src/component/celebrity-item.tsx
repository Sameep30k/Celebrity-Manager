'use client'

import { useState, useEffect } from 'react'
import { Celebrity } from '@/types/celebrity'
import { calculateAge } from '@/utils/calculateAge'
import { ChevronDown, ChevronUp, Trash2, Pencil, X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface CelebrityItemProps {
  celebrity: Celebrity
  isExpanded: boolean
  isEditing: boolean
  onToggle: () => void
  onEdit: () => void
  onCancelEdit: () => void
  onDelete: () => void
  onUpdate: (data: Partial<Celebrity>) => void
}

export function CelebrityItem({
  celebrity,
  isExpanded,
  isEditing,
  onToggle,
  onEdit,
  onCancelEdit,
  onDelete,
  onUpdate,
}: CelebrityItemProps) {
  const [formData, setFormData] = useState(celebrity)
  const [hasChanges, setHasChanges] = useState(false)
  const age = calculateAge(celebrity.dob)
  const isAdult = age >= 18

  useEffect(() => {
    setFormData(celebrity)
    setHasChanges(false)
  }, [celebrity, isEditing])

  const handleChange = (field: keyof Celebrity, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value }
      setHasChanges(JSON.stringify(newData) !== JSON.stringify(celebrity))
      return newData
    })
  }

  const handleSave = () => {
    if (hasChanges) {
      onUpdate(formData)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between p-4 cursor-pointer" onClick={onToggle}>
        <div className="flex items-center gap-4">
          <img
            src={celebrity.picture}
            alt={`${celebrity.first} ${celebrity.last}`}
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-medium">
            {celebrity.first} {celebrity.last}
          </span>
        </div>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </CardHeader>

      {isExpanded && (
        <CardContent className="p-4 pt-0">
          {isEditing ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Age</label>
                  <Input
                    type="number"
                    value={calculateAge(formData.dob)}
                    onChange={(e) => {
                      const newAge = parseInt(e.target.value);
                      if (!isNaN(newAge)) {
                        const currentDate = new Date();
                        const newDob = new Date(currentDate.getFullYear() - newAge, currentDate.getMonth(), currentDate.getDate());
                        handleChange('dob', newDob.toISOString().split('T')[0]);
                      }
                    }}
                    className="rounded-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Gender</label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleChange('gender', value)}
                  >
                    <SelectTrigger className="rounded-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Transgender">Transgender</SelectItem>
                      <SelectItem value="Rather not say">Rather not say</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Country</label>
                  <Input
                    type="text"
                    value={formData.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                    className="rounded-full"
                    pattern="[A-Za-z\s]+"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-500">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={4}
                  className="rounded-xl resize-none"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onCancelEdit}
                  className="rounded-full"
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSave}
                  disabled={!hasChanges}
                  className="rounded-full"
                >
                  <Check className="h-4 w-4 text-green-500" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Age</span>
                  <p>{age} Years</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Gender</span>
                  <p className="capitalize">{celebrity.gender}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Country</span>
                  <p>{celebrity.country}</p>
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-500">Description</span>
                <p className="mt-1 text-gray-600">{celebrity.description}</p>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete()
                  }}
                  className="rounded-full text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (isAdult) {
                      onEdit()
                    } else {
                      alert("Only adults can be edited.")
                    }
                  }}
                  disabled={!isAdult}
                  className="rounded-full text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}



