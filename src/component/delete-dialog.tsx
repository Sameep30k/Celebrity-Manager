// 'use client'

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { X } from 'lucide-react'

// interface DeleteDialogProps {
//   isOpen: boolean
//   onClose: () => void
//   onConfirm: () => void
// }

// export function DeleteDialog({ isOpen, onClose, onConfirm }: DeleteDialogProps) {
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-[400px] p-6 rounded-lg">
//         <button 
//           onClick={onClose}
//           className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
//         >
//           <X className="h-4 w-4" />
//           <span className="sr-only">Close</span>
//         </button>
//         <DialogHeader className="space-y-3">
//           <DialogTitle className="text-xl">Delete dialog box</DialogTitle>
//           <DialogDescription className="text-base text-gray-500">
//             Are you sure you want to delete?
//           </DialogDescription>
//         </DialogHeader>
//         <div className="flex justify-end gap-3 mt-6">
//           <Button 
//             variant="outline" 
//             onClick={onClose}
//             className="rounded-md px-4 py-2"
//           >
//             Cancel
//           </Button>
//           <Button 
//             onClick={onConfirm}
//             className="rounded-md px-4 py-2 bg-red-500 hover:bg-red-600 text-white"
//           >
//             Delete
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'

interface DeleteDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteDialog({ isOpen, onClose, onConfirm }: DeleteDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px] p-6 rounded-lg">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl">Delete dialog box</DialogTitle>
          <DialogDescription className="text-base text-gray-500">
            Are you sure you want to delete?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3 mt-6">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="rounded-md px-4 py-2"
          >
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            className="rounded-md px-4 py-2 bg-red-500 hover:bg-red-600 text-white"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

