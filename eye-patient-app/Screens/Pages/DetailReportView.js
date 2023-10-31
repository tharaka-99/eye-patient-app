import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebase/firebase-config";
import Lightbox from "react-native-lightbox-v2";
import { Fontisto } from "@expo/vector-icons";

const override = {
  display: "block",
  margin: "10% auto",
};

export default function DetailReportView({ route }) {
  const { item } = route.params;
  const id = item.id;
  const [report, setReport] = useState("");
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // console.log(item.id);
    const fetchReport = async () => {
      setIsLoading(true);
      try {
        const reportRef = doc(db, "reports", id);
        const reportDoc = await getDoc(reportRef);

        // const docRef = doc(db, "reports", id);

        // const docSnap = await getDoc(reportRef);

        if (reportDoc.exists) {
          setReport(reportDoc.data());
          // console.log(report);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2500);
        // Set isLoading to false when the data is loaded or an error occurs.
      }
    };

    fetchReport();
  }, [id]);

  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      {isLoading ? ( // Conditional rendering based on isLoading state
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={"#2196F3"} />
        </View>
      ) : (
        <View>
          <View style={styles.container}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                // elevation: 10,
                marginLeft: "auto",
                borderWidth: 0.5,
                padding: 5,
                borderRadius: 5,
                borderColor: "#000",
              }}
            >
              <Fontisto
                style={{
                  transform: [{ rotateY: "180deg" }],
                }}
                name="date"
                size={24}
                color="black"
              />
              <Text style={styles.dateText}>{report.date}</Text>
            </View>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>Comment:</Text>
            <Text style={styles.commentText}>{report.comment}</Text>
          </View>
          <FlatList
            style={{ marginBottom: "45%" }}
            data={report.results}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  flex: 1,
                  // borderColor: "#9E9E9E",
                  // borderWidth: 2,
                  // borderBottomWidth: 1,
                  margin: 10,
                  elevation: 3,
                }}
                onPress={() => navigation.navigate("Report", { item })}
              >
                <Lightbox underlayColor="white">
                  <Image
                    style={{ flex: 1, width: "100%", height: 250 }}
                    resizeMode="contain"
                    source={{ uri: item.imageLink }}
                  />
                </Lightbox>
                <View style={{ padding: 10 }}>
                  <Text style={styles.predictionText}>
                    Prediction: {item.prediction.top}
                  </Text>
                  <Text style={styles.confidenceText}>
                    Confidence: {item.prediction.confidence}
                  </Text>
                </View>
              </View>
            )}
          ></FlatList>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10, // Adjust this to control spacing between items
    // backgroundColor: "#E0E0E0",
    // borderRadius: 8,
    padding: 20,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 1,
    // elevation: 1,
  },
  commentText: {
    fontSize: 17,
    marginBottom: 5, // Adjust this to control spacing between comment and date
  },
  dateText: {
    fontSize: 18,
    color: "#616161",
    marginLeft: 10,
    fontWeight: "600",
  },

  predictionText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333", // Text color for prediction
  },
  confidenceText: {
    fontSize: 16,
    color: "#555", // Text color for confidence
  },
});
