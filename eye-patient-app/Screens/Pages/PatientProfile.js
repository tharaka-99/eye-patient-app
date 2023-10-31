import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export default function PatientProfile({ route }) {
  const { patient } = route.params;
  const id = patient.id;
  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
        padding: 30,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 20 }}>
          {patient.fullName}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 18,
          paddingTop: 10,
          marginBottom: 5,
          fontWeight: "600",
          color: "#0C356A",
          opacity: 0.7,
        }}
      >
        Personal details
      </Text>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />

      <View style={{ marginLeft: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <AntDesign
            name="idcard"
            size={30}
            color="#1F4172"
            style={{
              transform: [{ rotateY: "180deg" }],
              marginRight: 15,
            }}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 7 }}>
            {patient.identityCardNo}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Foundation
            name="male-female"
            size={30}
            color="#1F4172"
            style={{
              transform: [{ rotateY: "180deg" }],
              marginRight: 15,
            }}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 7 }}>
            {patient.gender}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 30,
              height: 30,
              marginRight: 15,
              transform: [{ rotateY: "180deg" }],
              resizeMode: "contain",
            }}
            source={require("../../assets/birthday(1).png")}
          />

          <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 7 }}>
            {patient.dob}
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontSize: 18,
          paddingTop: 25,
          marginBottom: 5,
          fontWeight: "600",
          color: "#0C356A",
          opacity: 0.7,
        }}
      >
        Patient contact details
      </Text>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />

      <View style={{ marginLeft: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <AntDesign
            name="mobile1"
            size={30}
            color="#1F4172"
            style={{
              transform: [{ rotateY: "180deg" }],
              marginRight: 15,
            }}
          />

          <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 7 }}>
            {patient.mobileNo}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons
            name="email"
            size={30}
            color="#1F4172"
            style={{
              transform: [{ rotateY: "180deg" }],
              marginRight: 15,
            }}
          />

          <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 7 }}>
            {patient.email}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Entypo
            name="location"
            size={30}
            color="#1F4172"
            style={{
              transform: [{ rotateY: "180deg" }],
              marginRight: 15,
            }}
          />

          <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 7 }}>
            {patient.address}
            {"\n"}
            {patient.district}
          </Text>

          {/* <Text>{patient.district}</Text> */}
        </View>
      </View>
    </View>
  );
}
