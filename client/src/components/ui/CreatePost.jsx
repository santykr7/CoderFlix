import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from './input';
import { Button } from './button';
import useUpload from '@/hooks/useImageUpload';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

const listGenre = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance'];
const listMovieType = ['South Hindi Dubbed', 'Adult Movies', 'Bollywood Movies', 'Hollywood Movies', 'Punjabi Movies'];

const CreatePost = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [screenShot, setScreenshot] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    movieRuntime: '',
    genre: '',
    movieType: '',
    movieDirector: '',
    movieProducer: '',
    releaseDate: '',
    movieRating: '',
    downloadLink: ''
  });
  const { toast } = useToast();

  const handleImageInput = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const uploadImages = async (files) => {
    const uploadedImages = [];
    for (const file of files) {
      const { public_id, secure_url } = await useUpload({ image: file });
      uploadedImages.push({ public_id, secure_url });
    }
    return uploadedImages;
  };

  const addMovie = async (e) => {
    e.preventDefault();
    try {
      const thumbnails = await uploadImages(selectedFiles);
      const res = await axios.post(
        import.meta.env.VITE_API_URL + '/create-movie',
        {
          ...formData,
          screenshot: thumbnails,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        }
      );

      const data = res.data;
      if (data.success) {
        toast({ description: 'Movie added successfully' });
        setFormData({
          title: '',
          movieRuntime: '',
          genre: '',
          movieType: '',
          movieDirector: '',
          movieProducer: '',
          releaseDate: '',
          movieRating: '',
          downloadLink:''
        });
        setSelectedFiles([]);
      } else {
        toast({ variant: "destructive", description: 'Failed to add movie' });
      }
    } catch (error) {
      toast({ variant: "destructive", description: `Error: ${error.message}` });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Please Add a Movie</h2>
      <form onSubmit={addMovie}>
        <div className="grid mt-3 gap-3">
          <Input
            type="text"
            placeholder="Enter a Movie title"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <Input
            type="text"
            placeholder="Enter Movie runtime"
            name="movieRuntime"
            value={formData.movieRuntime}
            onChange={(e) => setFormData({ ...formData, movieRuntime: e.target.value })}
          />
          <Select name="genre" onValueChange={(value) => setFormData({ ...formData, genre: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select a Genre" />
            </SelectTrigger>
            <SelectContent>
              {listGenre.map((genre, i) => (
                <SelectItem key={i} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select name="movieType" onValueChange={(value) => setFormData({ ...formData, movieType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Movie Type" />
            </SelectTrigger>
            <SelectContent>
              {listMovieType.map((movieType, i) => (
                <SelectItem key={i} value={movieType}>
                  {movieType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="text"
            placeholder="Enter Movie director"
            name="movieDirector"
            value={formData.movieDirector}
            onChange={(e) => setFormData({ ...formData, movieDirector: e.target.value })}
          />
          <Input
            type="text"
            placeholder="Enter Movie producers"
            name="movieProducer"
            value={formData.movieProducer}
            onChange={(e) => setFormData({ ...formData, movieProducer: e.target.value })}
          />
          <Input
            type="date"
            placeholder="Enter Movie release date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Enter Movie rating"
            name="movieRating"
            value={formData.movieRating}
            onChange={(e) => setFormData({ ...formData, movieRating: e.target.value })}
          />
          <Input
            type="text"
            placeholder="download Link"
            name="downloadLink"
            value={formData.downloadLink}
            onChange={(e) => setFormData({ ...formData, downloadLink: e.target.value })}
          />
          <Input type="file" multiple onChange={handleImageInput} />
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
