'use client'

import { cn } from '@/lib/utils'
import { ImageIcon, Loader2, MousePointerSquareDashed } from 'lucide-react'
import { useState, useTransition } from 'react'
import Dropzone, { FileRejection } from 'react-dropzone'
import { Progress } from '@/components/ui/progress'
import { useUploadThing } from '@/lib/uploadthing'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

const Page = () => {
  const { toast } = useToast()
  const [isDragOver, setIsDragOver] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const router = useRouter()

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId
      startTransition(() => {
        router.push(`/configure/design?id=${configId}`)
      })
    },
    onUploadProgress(p) {
      setUploadProgress(p)
    },
  })

  const onDropRejectex = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles

    setIsDragOver(false)

    toast({
      title: `${file.file.type} Datei typ nicht unterstützt.`,
      description: 'Bitte versuche es mit einer PNG, JPEG oder JPG Datei.',
      variant: 'destructive',
    })
  }
  const onDropAccepted = (acceptedFiles: File[]) => {
    startUpload(acceptedFiles, { configId: undefined })

    setIsDragOver(false)
  }

  const [isPending, startTransition] = useTransition()

  return (
    <div
      className={cn(
        'relative my-16 flex size-full flex-1 flex-col items-center justify-center rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl',
        {
          'bg-blue-900/10 ring-blue-900/25': isDragOver,
        }
      )}
    >
      <div className="relative flex w-full flex-1 flex-col items-center justify-center">
        <Dropzone
          onDropRejected={onDropRejectex}
          onDropAccepted={onDropAccepted}
          accept={{
            'image/*': ['.jpg', '.jpeg', '.png'],
          }}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className="flex size-full flex-1 flex-col items-center justify-center"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragOver ? (
                <MousePointerSquareDashed className="mb-2 size-6 text-zinc-500" />
              ) : isUploading || isPending ? (
                <Loader2 className="mb-2 size-6 animate-spin text-zinc-500" />
              ) : (
                <ImageIcon
                  width={24}
                  height={24}
                  className="mb-2 size-6 text-zinc-500"
                />
              )}
              <div className="mb-2 flex flex-col justify-center text-sm text-zinc-700">
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <p>Hochladen...</p>
                    <Progress
                      value={uploadProgress}
                      className="mt-2 h-2 w-40 bg-gray-300"
                    />
                  </div>
                ) : isPending ? (
                  <div className="flex flex-col items-center">
                    <p>Weiterleiten, bitte warten...</p>
                  </div>
                ) : isDragOver ? (
                  <p>
                    <span className="font-semibold">
                      Die Datei hier ablegen
                    </span>
                    , um sie hochzuladen.
                  </p>
                ) : (
                  <p>
                    <span className="font-semibold">
                      Klicken zum Hochladen{' '}
                    </span>
                    <span className="font-bold text-green-600">oder </span>
                    <span className="font-semibold">
                      die Datei hier ablegen.
                    </span>
                  </p>
                )}
              </div>
              {isPending ? null : (
                <p className="text-xs text-zinc-500">PNG, JPG, JPEG</p>
              )}
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  )
}

export default Page
