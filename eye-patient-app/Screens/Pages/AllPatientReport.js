import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

export default function AllPatientReport({ route }) {
  // const { user } = route.params;
  const [list, setList] = useState("");
  const [reports, setReports] = useState([]);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [patientDetails, setPatientDetails] = useState([]);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    const handleSearch = async () => {
      // if (phoneNumber) {
      setIsLoading(true);
      // const mobile = user.phoneNumber;
      const mobile = "+94773482114";
      const cleanedMobile = "0" + mobile.slice(-10).substring(1);
      console.log(cleanedMobile);
      try {
        const q = query(
          collection(db, "patientDetails"),
          where("mobileNo", "==", cleanedMobile)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const document = querySnapshot.docs[0];
          fetchReports(document.id);
          const detailsArray = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
            detailsArray.push({ id, ...data });
          });
          setPatientDetails(detailsArray);
        } else {
          console.log("No patient found");
        }
      } catch (error) {
        console.error("Error searching for patient:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        // Set isLoading to false when the data is loaded or an error occurs.
      }
    };
    handleSearch();
  }, []);

  const fetchReports = async (patientId) => {
    if (patientId) {
      const q = query(
        collection(db, "reports"),
        where("pationID", "==", patientId)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const reportData = [];
        querySnapshot.forEach((doc) => {
          const report = doc.data();
          reportData.push({
            id: doc.id,
            pationID: report.pationID,
            comment: report.comment,
            results: report.results,
            date: report.date,
          });
        });

        setReports(reportData);
      } else {
        console.log("No documents found");
      }
    }
  };

  const filteredData = reports?.filter((item) => {
    if (search == "") {
      return item;
    } else if (
      item.date
        .toString()
        .toLowerCase()
        .includes(search.toString().toLowerCase())
    ) {
      return item;
    }
    return 0;
  });

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={"#2196F3"} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{
              backgroundColor: "#FBFBFB",
              elevation: 10,
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                marginLeft: 20,
                marginTop: 20,
              }}
            >
              My Eye Reports
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                backgroundColor: "#EBE7E6",
                borderRadius: 10,
                height: 50,
                marginVertical: 15,
                marginHorizontal: 20,
                elevation: 5,
              }}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  justifyContent: "center",
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                <Ionicons
                  name="search-outline"
                  size={25}
                  color="#BEBEBE"
                  style={{
                    // width: 40,
                    marginLeft: "auto",
                    alignContent: "center",
                    justifyContent: "center",
                    transform: [{ rotateY: "180deg" }],
                  }}
                />
              </View>
              {/* <Icon name="search" type="font-awesome" /> */}
              <TextInput
                style={{
                  flex: 1,
                  color: "#000",
                  marginLeft: 15,
                  fontSize: 18,
                }}
                placeholder="Search a Report"
                // value={searchText}
                onChangeText={(text) => setSearch(text)}
              />
              <TouchableOpacity>
                <Fontisto
                  style={{
                    // width: 40,
                    left: 10,
                    marginLeft: "auto",
                    alignContent: "center",
                    justifyContent: "center",
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    padding: 10,
                    transform: [{ rotateY: "180deg" }],
                  }}
                  name="date"
                  size={30}
                  color="black"
                />
              </TouchableOpacity>
            </View>

            <View>
              {filteredData.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    borderRadius: 5,
                    // backgroundColor: "#E1F5FE",
                    // backgroundColor: "#D2EBE7",
                    backgroundColor: "#fff",
                    marginHorizontal: 20,
                    marginVertical: 7,
                    padding: 5,
                    elevation: 10,
                    shadowColor: "#023e8a",
                  }}
                  onPress={() => navigation.navigate("Report", { item })}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Image
                      source={{ uri: item.results[0].imageLink }}
                      style={{
                        width: "50%",
                        height: 170,
                        resizeMode: "contain",
                        margin: 7,
                      }}
                    />
                    <View style={{ padding: 10, flex: 1 }}>
                      <Text
                        style={{
                          marginLeft: "auto",
                          marginBottom: 10,
                          backgroundColor: "#8ED7F0",
                          padding: 3,
                          paddingHorizontal: 6,
                          borderRadius: 5,
                          fontSize: 15,
                          fontWeight: "600",
                        }}
                      >
                        {item.date}
                      </Text>

                      <View>
                        <Text
                          style={{
                            color: "#78909C",
                            paddingBottom: 5,
                            fontWeight: "600",
                          }}
                        >
                          Doctor's diagnosis:
                        </Text>
                        <Text numberOfLines={5} style={styles.detailLabel}>
                          {item.comment}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 23,
    fontWeight: "bold",
    // marginBottom: 16,
    textAlign: "center",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1d3557",
  },
  detailText: {
    fontSize: 17,
    flex: 2,
  },
});
