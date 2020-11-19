import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { getImageFromApi } from '../API/TMDBApi';

import FadeIn from '../Animations/FadeIn';

class FilmItem extends React.Component{
  _displayFavoriteImage(){
    if(this.props.isFilmFavorite){
      const sourceImage = require('../Images/ic_favorite.png')
      return(
        <Image style={styles.favorite_image} source={sourceImage} />
      )
    }
  }

  render(){
    const { film, displayDetailForFilm } = this.props;
    return(
      <FadeIn>
        <TouchableOpacity style={styles.main_container} onPress={() => displayDetailForFilm(film.id)}>
          <Image style={styles.image}
            style={styles.image}
            source={{uri: getImageFromApi(film.poster_path)}} />
          <View style={styles.text_container}>
            <View style={styles.header}>
              {this._displayFavoriteImage()}
              <Text style={styles.title_text}>{film.title}</Text>
              <Text style={styles.vote_text}>{film.vote_average}</Text>
            </View>
            <View style={styles.body}>
              <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
            </View>
            <View style={styles.footer}>
              <Text style={styles.date_text}>Sorti le {film.release_date}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </FadeIn>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row'
  },
  text_container: {
    flex: 1,
    margin: 5
  },
  image: {
    width: 120,
    height: 180,
    margin: 5
  },
  header: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  body: {
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  footer: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  },
  favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5
  }
});

export default FilmItem;
