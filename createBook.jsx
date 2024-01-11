import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Modal,
  Image,
} from "react-native";
import StarRating from "react-native-star-rating";
import { useNavigation } from "@react-navigation/native";

const CreateBook = ({ route }) => {
  const [numberStars, setNumberStars] = useState(1);
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthors, setBookAuthors] = useState("");
  const [comment, setComment] = useState("");
  const [photo, setPhoto] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    if (route.params && route.params.photo) {
      setPhoto(route.params.photo);
    }
  }, [route.params]);

  const handleSave = () => {
    console.log("Número de estrellas seleccionado:", numberStars);
    if (numberStars >= 3) {
      console.log("¡El usuario le dio una buena calificación!");
    } else {
      console.log("¡El usuario le dio una calificación baja!");
    }
    console.log("Foto tomada:", photo);

    setNumberStars(0);
    setBookTitle("");
    setBookAuthors("");
    setComment("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageAndBookContainer}>
        <View style={styles.bookContainer}>
          <TextInput
            style={styles.input}
            placeholder="Book Title"
            value={bookTitle}
            onChangeText={(text) => setBookTitle(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Book Authors"
            value={bookAuthors}
            onChangeText={(text) => setBookAuthors(text)}
          />
        </View>
        <View style={styles.cameraContainer}>
          {photo && (
            <Image source={{ uri: photo }} style={styles.photoPreview} />
          )}
          <Button
            title="Tomar foto"
            onPress={() => {
              navigation.navigate("CameraScrean");
            }}
          />
        </View>
      </View>
      <View style={styles.comentaryContainer}>
        <Text style={[styles.titleText]}>Comment</Text>
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Comment"
            value={comment}
            onChangeText={(text) => setComment(text)}
            multiline={true}
          />
        </View>
      </View>
      <View style={styles.RaitingContainer}>
        <Text style={styles.titleText}>Rating</Text>
        <StarRating
          rating={numberStars}
          selectedStar={(rating) => {
            console.log("Estrellas seleccionadas:", rating);
            setNumberStars(rating);
          }}
          maxStars={5}
        />
      </View>
      <View
        style={{
          flex: 0.2,
          flexDirection: "column",
          justifyContent: "center",
          paddingHorizontal: 15,
        }}
      >
        <Button title="Save" onPress={handleSave} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  imageAndBookContainer: {
    flex: 0.4,
    flexDirection: "row",
  },
  bookContainer: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  cameraContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "400",
    color: "#000",
    textTransform: "capitalize",
    marginTop: 10,
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#e5e5e5",
    borderRadius: 10,
    color: "#000",
    fontWeight: "300",
  },
  comentaryContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  commentInputContainer: { 
    width: "100%",
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 5,
  },
  commentInput: {
    backgroundColor: "transparent",
    color: "#000",
    fontWeight: "300",
    fontSize: 18,
    height: 100,
  },

  RaitingContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  photoPreview: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
});

export default CreateBook;
