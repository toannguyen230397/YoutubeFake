import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

export default function DropDown({ setType }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Không Có', value: '1' },
    { label: 'Tin Tức', value: '2' },
    { label: 'Âm Nhạc', value: '3' },
    { label: 'Thể Thao', value: '4' },
    { label: 'Giải Trí', value: '5' },
    { label: 'Trò Chơi', value: '6' },
  ]);

  return (
    <DropDownPicker
      // listMode='MODAL'
      listMode="SCROLLVIEW"
      scrollViewProps={{
        nestedScrollEnabled: true,
      }}
      dropDownContainerStyle={{
        position: 'relative',
        top: 0
      }}
      theme="LIGHT"
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder={'Chọn thể loại'}
      onSelectItem={item => {
        setType(item.label);
      }}
    />
  )
}