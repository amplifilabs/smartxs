import React from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {Style} from 'twrnc/dist/esm/types';
import tw from '../../lib/tailwind';
import {useTogglePasswordVisibility} from './hooks/useTogglePasswordVisibility';
import Invisible from './icons/Invisible';
import Visible from './icons/Visible';

type Props = {
  label?: string;
  placeholder?: string;
  helper?: string;
  style?: Style;
  labelStyle?: Style;
  inputStyle?: Style;
  textInputStyle?: Style;
  helperStyle?: Style;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  inputType?: 'primary' | 'secondary';
  helperType?: 'primary' | 'secondary';
};

const PasswordInput: React.FC<Props> = ({
  label,
  placeholder,
  helper,
  style,
  labelStyle,
  inputStyle,
  textInputStyle,
  helperStyle,
  onChangeText,
  value,
  inputType,
  helperType,
}) => {
  const {passwordVisibility, handlePasswordVisibility} =
    useTogglePasswordVisibility();

  const defaultInputStyle = tw.style(
    'font-sm font-normal text-gray-500 bg-white p-3 rounded-md border-gray-300 border w-full flex-col',
  );

  const defaultTextInputStyle = tw.style('');

  const defaultLabelStyle = tw.style('font-sm font-medium text-gray-700 pb-1x');

  const defaultHelperStyle = tw.style(
    /* font-xs */ 'font-normal text-gray-500 pt-1',
  );

  const typeInputStyle = inputType
    ? tw`border-${inputType}-700 ${
        inputType === 'primary' ? 'border-2' : 'border'
      }`
    : tw``;

  const typeHelperStyle = helperType ? tw`text-${helperType}-700` : tw``;

  return (
    <View style={{...defaultInputStyle, ...inputStyle}}>
      <View style={tw`flex-row items-center`}>
        {label && (
          <Text style={{...defaultLabelStyle, ...labelStyle}}>{label}</Text>
        )}
        <TextInput
          style={{
            ...defaultTextInputStyle,
            ...typeInputStyle,
            ...textInputStyle,
          }}
          onChangeText={onChangeText}
          value={value || undefined}
          placeholder={placeholder || undefined}
          secureTextEntry={passwordVisibility}
        />
        <Pressable onPress={handlePasswordVisibility}>
          {passwordVisibility ? (
            <SvgXml
              style={tw.style(``, {resizeMode: 'contain'})}
              xml={Invisible}
            />
          ) : (
            <SvgXml
              style={tw.style(``, {resizeMode: 'contain'})}
              xml={Visible}
            />
          )}
        </Pressable>
        {helper && (
          <Text
            style={{...defaultHelperStyle, ...typeHelperStyle, ...helperStyle}}>
            {helper}
          </Text>
        )}
      </View>
    </View>
  );
};

export default PasswordInput;