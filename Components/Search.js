import React from 'react';
import { StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator } from 'react-native';
import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi';
import { connect } from 'react-redux';

class Search extends React.Component {

  constructor(props){
    super(props);
    this.page = 0;
    this.totalPages = 0;
    this.searchedText = "";
    this.state = {
      films: [],
      isLoading: false
    };
  }

  _searchFilms(){
    this.page = 0;
    this.totalPages = 0;
    this.setState({ films: [] }, () => {
      this._loadFilms();
    });
  }

  _loadFilms(){
    if(this.searchedText.length > 0){
      this.setState({ isLoading: true });
      getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
        this.page = data.page;
        this.totalPages = data.total_pages;
        this.setState({
          films: [ ...this.state.films, ...data.results ],
          isLoading: false
        });
      });
    }
  }

  _searchTextInputChanged(text){
    this.searchedText = text;
  }

  _displayLoading(){
    if(this.state.isLoading){
      return(
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _displayDetailForFilm = (idFilm) => {
    console.log("Display film with id " + idFilm);
    this.props.navigation.navigate("FilmDetail", { idFilm: idFilm });
  }

  render(){
    return (
      <View style={ styles.main_container }>
        <TextInput style={ styles.textintput }
          placeholder="Titre du film"
          onSubmitEditing={() => this._searchFilms()}
          onChangeText={(text) => this._searchTextInputChanged(text)} />
        <Button title="Rechercher" onPress={() => this._searchFilms()}/>

        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          extraData={this.props.favoritesFilm}
          renderItem={({item}) => <FilmItem film={item}
                                      isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                                      displayDetailForFilm={this._displayDetailForFilm} />}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if(this.page < this.totalPages){
              this._loadFilms();
            }
          }}
        />
        {this._displayLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  textintput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(Search);
