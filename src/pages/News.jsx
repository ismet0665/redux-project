import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";
import { getNews, clearNews } from "../features/newsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import loadingGif from "../assets/loading.gif";
import images from "../assets/img.png";

const News = () => {
  const dispatch = useDispatch();
  const { news, error, loading } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(getNews());
    return () => {
      dispatch(clearNews()); //? cleanup funct (componentDidUnmount) user logout oldugunda clearNews() func. çalışsın dedik.
    };
  }, []);

  return (
    <>
      {/* <h1>NEWS</h1> */}
      {loading && (
        <Box display="flex" alignItems="center" justifyContent="center">
          <img src={loadingGif} alt="loading" />
        </Box>
      )}

      {error && (
        <Typography variant="h2" color="error" textAlign="center" marginTop={2}>
          {error}
        </Typography>
      )}

      <Box
        xs={{ d: "flex" }}
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
        flexWrap="wrap"
      >
        {news?.map((item, index) => (
          <Card sx={{ width: 345, m: 3, height: 600 }} key={index}>
            <CardMedia
              component="img"
              height="250"
              image={item?.urlToImage || images}
              alt="img"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item?.content}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small" href={item?.url} target="_blank">
                Detail
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default News;
