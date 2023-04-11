import React, { useContext } from "react";
import { Text, Card, useTheme, Button } from "@ui-kitten/components";
import { ThemeContext } from "../configs/Theme";

export const NewCard = ({
  onPress,
  title = "Title",
  description = "Description",
}) => {
  const themeContext = useContext(ThemeContext);
  const theme = useTheme();
  return (
    <Card
      disabled
      style={{
        marginHorizontal: "5%",
        marginVertical: "1%",
        backgroundColor: theme["color-info-default"],
        borderColor:
          themeContext.theme == "light"
            ? theme["color-info-default"]
            : theme["color-info-100"],
      }}
    >
      <Text
        category="h5"
        style={{
          fontWeight: "bold",
          color: theme["color-info-100"],
          marginBottom: 10,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: theme["color-info-100"],
          marginVertical: 10,
          textAlign: "center",
        }}
        category="label"
      >
        {description}
      </Text>
      <Button
        onPress={onPress}
        style={{ borderRadius: 5, marginVertical: 20 }}
        status="control"
      >
        Choose
      </Button>
    </Card>
  );
};
