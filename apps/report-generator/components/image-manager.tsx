"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Trash2, Copy, ImageIcon } from "lucide-react"

interface ImageManagerProps {
  images: Array<{ id: string; name: string; url: string; type: "logo" | "image" | "icon" }>
  onImagesChange: (images: Array<{ id: string; name: string; url: string; type: "logo" | "image" | "icon" }>) => void
}

export default function ImageManager({ images, onImagesChange }: ImageManagerProps) {
  const [newImage, setNewImage] = useState({
    name: "",
    url: "",
    type: "image" as "logo" | "image" | "icon",
  })

  const addImage = () => {
    if (newImage.name && newImage.url) {
      const image = {
        id: Date.now().toString(),
        ...newImage,
      }
      onImagesChange([...images, image])
      setNewImage({ name: "", url: "", type: "image" })
    }
  }

  const removeImage = (id: string) => {
    onImagesChange(images.filter((img) => img.id !== id))
  }

  const copyMarkdown = (image: any) => {
    const markdown = `![${image.name}](${image.url})`
    navigator.clipboard.writeText(markdown)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real app, you'd upload to a service like Vercel Blob
      const url = URL.createObjectURL(file)
      setNewImage({
        ...newImage,
        name: file.name,
        url: url,
      })
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Asset</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="file-upload">Upload File</Label>
            <Input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="cursor-pointer"
            />
          </div>

          <div className="text-center text-gray-500">or</div>

          <div>
            <Label htmlFor="image-name">Asset Name</Label>
            <Input
              id="image-name"
              value={newImage.name}
              onChange={(e) => setNewImage({ ...newImage, name: e.target.value })}
              placeholder="Company Logo"
            />
          </div>

          <div>
            <Label htmlFor="image-url">Image URL</Label>
            <Input
              id="image-url"
              value={newImage.url}
              onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
              placeholder="https://example.com/image.png"
            />
          </div>

          <div>
            <Label htmlFor="image-type">Asset Type</Label>
            <Select
              value={newImage.type}
              onValueChange={(value: "logo" | "image" | "icon") => setNewImage({ ...newImage, type: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="logo">Logo</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="icon">Icon</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={addImage} className="w-full">
            <Upload className="w-4 h-4 mr-2" />
            Add Asset
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Asset Library ({images.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {images.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No assets uploaded yet</p>
              <p className="text-sm">Add logos, images, or icons to enhance your reports</p>
            </div>
          ) : (
            <div className="space-y-4">
              {images.map((image) => (
                <div key={image.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{image.name}</h4>
                    <p className="text-sm text-gray-500 capitalize">{image.type}</p>
                    <p className="text-xs text-gray-400 truncate max-w-xs">{image.url}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => copyMarkdown(image)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => removeImage(image.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
