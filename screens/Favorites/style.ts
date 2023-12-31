import styled from "styled-components/native";

interface CustomProps {
  theme?: string;
  checkMode?: boolean;
  check?: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: CustomProps) =>
    props.theme === "Light" ? "#fff" : "#282828"};
  align-items: center;
  justify-content: center;
`;

export const Item = styled.TouchableOpacity`
 
  background-color: ${(props: CustomProps) =>
    props.checkMode && props.check ? "#EF5350" : props.theme === "Dark" ? "#363636" : "#f4f4f4"};

  margin: auto;
  padding: 16px;
  border-radius: 8px;
  min-width: 360px;
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  /* max-height: auto; */
  margin-right: ${(props: CustomProps) => (props.checkMode ? "16px" : "4px")};
  margin-left: ${(props: CustomProps) => (props.checkMode ? "16px" : "4px")};
`;

export const ButtonClose = styled.Pressable`
  background-color: ${(props: CustomProps) =>
    props.theme === "Dark" ? "#363636" : "#f4f4f4"};
  margin: auto;
  padding: 16px;
  border-radius: 8px;
  /*min-width: 70px;*/
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  /*max-height: 30px;*/
`;

export const Message = styled.Text`
  font-size: 18px;
  color: ${(props: CustomProps) =>
    props.theme === "Dark" ? "#f4f4f4" : "#282828"};
  width: 260px;
  font-weight: 400;
  /* text-overflow: ellipsis; */
  /* color: ${(props: CustomProps) =>
    props.check && props.checkMode ? "#363636" : "inherit"}; */
`;

export const Author = styled.Text`
  font-size: 14px;
  color: ${(props: CustomProps) =>
    props.theme === "Dark" ? "#f4f4f4" : "#282828"};
  font-weight: 600;
  /* color: ${(props: CustomProps) =>
    props.check && props.checkMode ? "#363636" : "inherit"}; */
`;

export const TrashButton = styled.Text`
  margin-left: auto;
  padding: 4px;
  border-radius: 4px;
  margin-top: auto;
  margin-bottom: auto;
`;

export const EmptyComp = styled.View`
  #img {
    width: 64px;
    height: 64px;
  }
`;

export const Img = styled.Image`
  width: 64px;
  height: 64px;
`;

export const Check = styled.Text`
  color: #fff;
`;
