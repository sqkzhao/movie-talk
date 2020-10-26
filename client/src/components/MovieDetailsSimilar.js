import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';

import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.white,
    },
    titleBar: {
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  }));

const MovieDetailsSimilar = (props) => {
    const { movieid } = props
    const [list, setList] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${movieid}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false`)
            .then(res => {
                setList(res.data.results)
            })
            .catch(err => console.log(err))
    }, [])
    
    return(
        <div className="my-5 py-3">
            {list.length!==0 ? <h5>Recommend</h5> : null}
            <div className={classes.root}>
                <GridList className={classes.gridList} cols={5.5} cellHeight={280}>
                    {list.map((movie, i) => {
                        return(
                            <GridListTile key={i}>
                                <img src={"http://image.tmdb.org/t/p/w342/"+ movie.poster_path} alt={movie.title} />
                                <GridListTileBar 
                                    className="similarTitle similarTitleBar"
                                    title={movie.title} 
                                    classes={{
                                        root: classes.titleBar,
                                        title: classes.title,
                                    }}
                                />
                            </GridListTile>
                        )
                    })}
                </GridList>
            </div>
        </div>
    )
}
export default MovieDetailsSimilar;