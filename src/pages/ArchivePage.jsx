import React, {useState, useEffect} from 'react'
import FolderIcon from '@mui/icons-material/Folder';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import { useFetching } from "../hooks/useFetching";
import ServerData from "../api/api";
import Loader from "../components/Loader/Loader";
import VideoCard from '../components/Cards/VideoCard/VideoCard';


const ArchivePage = () => {
  const [videos, setVideos] = useState([]);
  const [onDelete, setOnDelete] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);

  const [fetchVideos, isVideosLoading] = useFetching(async (limit,page) => {
  const response = await ServerData.getVideoList(limit, page);
    setVideos([...response.data]);
    const totalCount = response.headers["x-total-count"]
    setTotalPages(getPageCount(totalCount, limit))
  });

  const removeVideo = (video) => {
    setVideos(videos.filter(v => v !== video))
  }

  const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit)
  }

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    fetchVideos(limit, page);
  }, [page,limit]);


  return (
    <Box>
        <Box
        display="flex"
        justifyContent="space-between"
        >
      <Typography component="h1" variant="myh">
         <FolderIcon/> Архив записей
      </Typography>
      {!onDelete ? 
        <Button onClick={()=>setOnDelete(true)}  variant="contained" color="error">
        Удалить видео
      </Button>
      :
      <Button onClick={()=>setOnDelete(false)}   variant="contained">
          Отмена
        </Button>
      }
        </Box>
      
      {!isVideosLoading ? <Grid
        container
        spacing={2}
        sx={{
          marginTop: 2,
        }}
      >
        {videos.map((data, index) => (
          <VideoCard
          key={index}
          videoData={data}
          remove={removeVideo}
          onDelete={onDelete}
          />
        ))}  
      </Grid>
      : 
      <Box display="flex" justifyContent="center" sx={{ marginTop: 10 }}>
          <Loader/>
        </Box>
      }
      <Box display="flex" justifyContent="center" sx={{
        mt:3
      }}>
        <Pagination count={totalPages} page={page} onChange={handleChange}/>
      </Box>
       
    </Box>
  )
}


export default ArchivePage