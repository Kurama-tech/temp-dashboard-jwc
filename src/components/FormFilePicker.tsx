import { mdiTrashCan } from '@mdi/js'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { ColorButtonKey } from '../interfaces'
import BaseButton from './BaseButton'
import BaseDivider from './BaseDivider'

type Props = {
  label?: string
  icon?: string
  accept?: string
  color: ColorButtonKey
  isRoundIcon?: boolean
  selectedImages: File[]
  handleImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleRemoveImage: (index: number) => void
}

const FormFilePicker = ({ label, icon, accept, color, isRoundIcon, selectedImages,  handleRemoveImage, handleImageSelect }: Props) => {
  const [file, setFile] = useState(null)

  //const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    const fileInput = inputRef.current;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleUpload = () => {
    //onUpload(selectedImages);
    // setSelectedImages([]);
  };


  const handleFileChange = (event) => {
    setFile(event.currentTarget.files[0])
  }

  const showFilename = !isRoundIcon && selectedImages

  return (
    <>
    <div className="flex items-stretch justify-start relative">
      <label className="inline-flex">
        <BaseButton
          className={`${isRoundIcon ? 'w-12 h-12' : ''} ${showFilename ? 'rounded-r-none' : ''}`}
          iconSize={isRoundIcon ? 24 : undefined}
          label={isRoundIcon ? null : label}
          icon={icon}
          color={color}
          roundedFull={isRoundIcon}
          asAnchor
        />
        <input
          type="file"
          multiple
          className="absolute top-0 left-0 w-full h-full opacity-0 outline-none cursor-pointer -z-1"
          onChange={handleImageSelect}
          accept={accept}
        />
      </label>
      
    </div>
    <BaseDivider />
    {showFilename && (
        <div className="px-4 py-2 max-w-full flex-grow-0 overflow-x-hidden bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 border rounded-r">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {selectedImages.map((image, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center space-x-4">
                <img className="w-10 h-10 rounded-full" src={URL.createObjectURL(image)} alt={image.name} />
                <div>
                  <div className="text-gray-900 font-medium">{image.name}</div>
                </div>
              </div>
              <BaseButton
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => handleRemoveImage(index)}
                    small
                  />
            </div>
          </div>

            
          ))}

          </div>
        </div>
      )}
      
    </>
  )
}

export default FormFilePicker
