'use client'
import React,{useState} from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

function VideoUpload() {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const router = useRouter()

  //max file size of 95 MB

  const MAX_FILE_SIZE = 95 * 1024 * 1024

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!file) {
      alert('Please select a file')
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      alert('File size is too large, please select a smaller file less than 95 MB')
      return
    }

    setIsUploading(true)

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('file', file)
    formData.append('originalSize', file.size.toString())

    try {
      const response = await axios.post('/api/video-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.status === 200) {
        alert('Video uploaded successfully')
        router.push('/')
      }
  }

  catch (error) {
    console.log(error)
    alert('Error uploading video')
  }

  finally {
    setIsUploading(false)
  }
}

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Upload Video</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='title' className='block mb-2'>
            Title
          </label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='input input-bordered w-full'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='description' className='block mb-2'>
            Description
          </label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='textarea textarea-bordered w-full'
          ></textarea>
        </div>
        <div className='mb-4'>
          <label htmlFor='file' className='block mb-2'>
            File
          </label>
          <input
            type='file'
            id='file'
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className='file-input file-input-bordered w-full'
          />
        </div>
        <button
          type='submit'
          className='btn btn-primary text-white'
          disabled={isUploading}
        >
          {isUploading ? 'Uploading ...' : 'Upload'}
        </button>
      </form>

    </div>
  )
}

export default VideoUpload