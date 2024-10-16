import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { AddMeasureForm } from './add-measure'
import { useModalStore } from '@/store/modalState'

export function MeasureModal() {
  const { isOpen, openModal, closeModal } = useModalStore()
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => (!isOpen ? openModal() : closeModal())}
    >
      <DialogTrigger asChild>
        <Button variant="outline">+ Measure</Button>
      </DialogTrigger>
      <DialogContent className="w-fit sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add measure</DialogTitle>
        </DialogHeader>
        <AddMeasureForm />
      </DialogContent>
    </Dialog>
  )
}
