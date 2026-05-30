"use client"

import React, { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Camera,
  Upload,
  X,
  Trash2,
  Edit,
  Eye,
  Image as ImageIcon,
  Video,
  Plus,
  Search,
  Grid3X3,
  List,
  Calendar,
  MapPin,
  Tag,
  FileImage,
  Film,
  HardDrive,
  CheckCircle2,
} from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { useMediaStore, type MediaItem } from "@/hooks/use-media-store"

const categories = [
  "Célébrations",
  "Jeunesse",
  "Musique",
  "Sacrements",
  "Pèlerinages",
  "Communauté",
  "Formation",
  "Événements",
]

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " o"
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " Ko"
  return (bytes / (1024 * 1024)).toFixed(1) + " Mo"
}

export default function MediaAdminPage() {
  const { media, loaded, addMedia, deleteMedia } = useMediaStore()
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterCategory, setFilterCategory] = useState("all")
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null)

  // Upload form state
  const [uploadTitle, setUploadTitle] = useState("")
  const [uploadDescription, setUploadDescription] = useState("")
  const [uploadCategory, setUploadCategory] = useState("Célébrations")
  const [uploadLocation, setUploadLocation] = useState("")
  const [uploadDate, setUploadDate] = useState("")
  const [dragActive, setDragActive] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }, [])

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter((f) =>
      f.type.startsWith("image/") || f.type.startsWith("video/")
    )
    setSelectedFiles(validFiles)

    const newPreviews: string[] = []
    validFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        newPreviews.push(e.target?.result as string)
        if (newPreviews.length === validFiles.length) {
          setPreviews([...newPreviews])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleUpload = () => {
    if (selectedFiles.length === 0) return
    setUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      selectedFiles.forEach((file, index) => {
        const isVideo = file.type.startsWith("video/")
        addMedia({
          type: isVideo ? "video" : "image",
          src: previews[index] || "",
          thumbnail: previews[index] || "",
          title: uploadTitle || file.name.replace(/\.[^/.]+$/, ""),
          description: uploadDescription,
          category: uploadCategory,
          date: uploadDate || new Date().toLocaleDateString("fr-FR"),
          location: uploadLocation || undefined,
          author: "Admin paroisse",
          fileName: file.name,
          fileSize: file.size,
          duration: isVideo ? "0:00" : undefined,
        })
      })

      setUploading(false)
      setUploadSuccess(true)
      setTimeout(() => {
        setShowUploadDialog(false)
        resetForm()
      }, 1500)
    }, 1500)
  }

  const resetForm = () => {
    setUploadTitle("")
    setUploadDescription("")
    setUploadCategory("Célébrations")
    setUploadLocation("")
    setUploadDate("")
    setSelectedFiles([])
    setPreviews([])
    setUploadSuccess(false)
  }

  const filteredMedia = media.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      filterCategory === "all" || item.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const stats = {
    total: media.length,
    images: media.filter((m) => m.type === "image").length,
    videos: media.filter((m) => m.type === "video").length,
    totalSize: media.reduce((acc, m) => acc + m.fileSize, 0),
  }

  return (
    <AdminLayout>
      <div className="space-y-5 sm:space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="font-cathedral text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2 sm:gap-3">
              <Camera className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
              Gestion des Médias
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Photos et vidéos de la paroisse
            </p>
          </div>
          <Button
            className="bg-royal-blue text-white hover:bg-royal-blue-light font-semibold"
            size="sm"
            onClick={() => setShowUploadDialog(true)}
          >
            <Upload className="w-4 h-4 mr-1.5" />
            Ajouter
          </Button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Total", value: stats.total, icon: HardDrive, color: "text-royal-blue", bg: "bg-royal-blue/10" },
            { label: "Photos", value: stats.images, icon: FileImage, color: "text-gold-dark", bg: "bg-gold/10" },
            { label: "Vidéos", value: stats.videos, icon: Film, color: "text-wine-red", bg: "bg-wine-red/10" },
            { label: "Taille", value: formatFileSize(stats.totalSize), icon: HardDrive, color: "text-emerald", bg: "bg-emerald/10" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="glass">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="text-lg font-bold font-cathedral">{stat.value}</p>
                    </div>
                    <div className={`p-2 rounded-lg ${stat.bg}`}>
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un média..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            <Button
              variant={filterCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCategory("all")}
              className={filterCategory === "all" ? "bg-royal-blue text-white" : ""}
            >
              Tout
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filterCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterCategory(cat)}
                className={`whitespace-nowrap ${filterCategory === cat ? "bg-royal-blue text-white" : ""}`}
              >
                {cat}
              </Button>
            ))}
          </div>
          <div className="flex gap-1">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              className="h-9 w-9"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              className="h-9 w-9"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Media Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredMedia.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
              >
                <Card className="glass overflow-hidden group cursor-pointer">
                  <div className="aspect-[4/3] relative bg-gradient-to-br from-royal-blue/10 to-gold/10">
                    {item.src ? (
                      <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {item.type === "video" ? (
                          <Video className="w-8 h-8 text-royal-blue/20" />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-royal-blue/20" />
                        )}
                      </div>
                    )}
                    {/* Type badge */}
                    <div className="absolute top-2 left-2">
                      <Badge className={`text-[9px] ${item.type === "video" ? "bg-red-600 text-white" : "bg-royal-blue text-white"}`}>
                        {item.type === "video" ? "Vidéo" : "Photo"}
                      </Badge>
                    </div>
                    {/* Actions overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="icon"
                        className="h-8 w-8 bg-white/20 hover:bg-white/30"
                        onClick={(e) => { e.stopPropagation(); setPreviewItem(item); }}
                      >
                        <Eye className="w-4 h-4 text-white" />
                      </Button>
                      <Button
                        size="icon"
                        className="h-8 w-8 bg-white/20 hover:bg-red-500/80"
                        onClick={(e) => { e.stopPropagation(); deleteMedia(item.id); }}
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-[9px]">
                        {item.category}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground">
                        {formatFileSize(item.fileSize)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="glass">
            <CardContent className="p-0 divide-y divide-border/50">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3 hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => setPreviewItem(item)}
                >
                  <div className="w-16 h-12 rounded-lg bg-gradient-to-br from-royal-blue/10 to-gold/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {item.src ? (
                      <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                    ) : item.type === "video" ? (
                      <Video className="w-5 h-5 text-royal-blue/30" />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-royal-blue/30" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                  </div>
                  <Badge variant="secondary" className="text-[9px] flex-shrink-0">
                    {item.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex-shrink-0 hidden sm:block">
                    {item.date}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 flex-shrink-0 text-destructive"
                    onClick={(e) => { e.stopPropagation(); deleteMedia(item.id); }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {filteredMedia.length === 0 && loaded && (
          <Card className="glass">
            <CardContent className="p-8 text-center">
              <Camera className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="font-cathedral text-lg text-muted-foreground">
                Aucun média trouvé
              </p>
            </CardContent>
          </Card>
        )}

        {/* Upload Dialog */}
        <Dialog open={showUploadDialog} onOpenChange={(open) => { if (!open) { setShowUploadDialog(false); resetForm(); } }}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-cathedral">Ajouter des médias</DialogTitle>
              <DialogDescription>
                Photos et vidéos de la paroisse
              </DialogDescription>
            </DialogHeader>

            {uploadSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <CheckCircle2 className="w-16 h-16 text-emerald mx-auto mb-4" />
                <h3 className="font-cathedral text-xl font-bold mb-2">
                  Médias ajoutés avec succès !
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selectedFiles.length} fichier(s) ajouté(s) à la galerie
                </p>
              </motion.div>
            ) : (
              <div className="space-y-5">
                {/* Drop zone */}
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                    dragActive
                      ? "border-royal-blue bg-royal-blue/5"
                      : "border-border hover:border-gold/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files) handleFiles(Array.from(e.target.files))
                    }}
                  />
                  <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium mb-1">
                    Glissez vos fichiers ici
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ou cliquez pour sélectionner • Images et vidéos acceptées
                  </p>
                </div>

                {/* Previews */}
                {previews.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto hide-scrollbar py-2">
                    {previews.map((preview, index) => (
                      <div key={index} className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-muted">
                        <img src={preview} alt="" className="w-full h-full object-cover" />
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedFiles(selectedFiles.filter((_, i) => i !== index))
                            setPreviews(previews.filter((_, i) => i !== index))
                          }}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/50 flex items-center justify-center cursor-pointer"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Form fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Titre *</Label>
                    <Input
                      placeholder="Ex: Messe de Pâques"
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Catégorie *</Label>
                    <select
                      value={uploadCategory}
                      onChange={(e) => setUploadCategory(e.target.value)}
                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Décrivez ce moment..."
                    value={uploadDescription}
                    onChange={(e) => setUploadDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Lieu</Label>
                    <Input
                      placeholder="Ex: Église Sainte-Thérèse"
                      value={uploadLocation}
                      onChange={(e) => setUploadLocation(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={uploadDate}
                      onChange={(e) => setUploadDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    className="flex-1 bg-royal-blue text-white hover:bg-royal-blue-light font-semibold"
                    onClick={handleUpload}
                    disabled={selectedFiles.length === 0 || uploading}
                  >
                    {uploading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                        />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Uploader {selectedFiles.length > 0 && `(${selectedFiles.length})`}
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => { setShowUploadDialog(false); resetForm(); }}
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Preview Dialog */}
        <Dialog open={!!previewItem} onOpenChange={(open) => !open && setPreviewItem(null)}>
          <DialogContent className="max-w-3xl">
            {previewItem && (
              <>
                <DialogHeader>
                  <DialogTitle className="font-cathedral">{previewItem.title}</DialogTitle>
                </DialogHeader>
                <div className="aspect-video rounded-xl overflow-hidden bg-muted">
                  {previewItem.src ? (
                    <img src={previewItem.src} alt={previewItem.title} className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {previewItem.type === "video" ? (
                        <Video className="w-12 h-12 text-muted-foreground/30" />
                      ) : (
                        <ImageIcon className="w-12 h-12 text-muted-foreground/30" />
                      )}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{previewItem.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{previewItem.category}</Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {previewItem.date}
                    </Badge>
                    {previewItem.location && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {previewItem.location}
                      </Badge>
                    )}
                    <Badge variant="outline">{formatFileSize(previewItem.fileSize)}</Badge>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
