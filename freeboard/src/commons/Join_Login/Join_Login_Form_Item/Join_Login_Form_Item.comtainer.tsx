import JoinLoginFormItemUI from "./Join_Login_Form_Item.presenter";

export default function JoinLoginFormItem({
  children,
  label,
  name,
  valuePropName,
  wrapperCol,
}: any) {
  return (
    <JoinLoginFormItemUI
      name={name}
      label={label}
      valuePropName={valuePropName}
      wrapperCol={wrapperCol}
    >
      {children}
    </JoinLoginFormItemUI>
  );
}
