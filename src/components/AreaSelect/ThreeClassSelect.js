import {Picker} from 'antd-mobile';
import React from 'react';
import districtData from 'china-location/dist/location.json';

class ThreeClassSelect extends React.Component{
  constructor(props){
    super(props);
    this.state={
      pickerValue:[]
    }
  }
  render() {
    let antdDistrict = [];
    Object.keys(districtData).forEach((index) => {
      let itemLevel1 = {};
      let itemLevel2 = {};
      itemLevel1.value = districtData[index].name;
      itemLevel1.label = districtData[index].name;
      itemLevel1.children = [];
      let data = districtData[index].cities;
      Object.keys(data).forEach((index) => {
        itemLevel2.value = data[index].name;
        itemLevel2.label = data[index].name;
        itemLevel2.children = [];
        let data2 = data[index].districts;
        let itemLevel3 = {};
        itemLevel3.children = [];
        Object.keys(data2).forEach((index) => {
          itemLevel3.value = data2[index];
          itemLevel3.label = data2[index];
          itemLevel2.children.push(itemLevel3);
          itemLevel3 = {};
        });
        itemLevel1.children.push(itemLevel2);
        itemLevel2 = {};
      });
      antdDistrict.push(itemLevel1)
    });

    return (
      <div>
        <Picker
          visible={this.props.areaSelectStatus}
          title="选择地区"
          extra="请选择(可选)"
          data={antdDistrict}
          value={this.state.pickerValue}
          onChange={v => this.setState({pickerValue: v})}
          onOk={v =>this.props.selectComfig(v)}
          onDismiss={this.props.cancel}
        >
        </Picker>
      </div>
    )

  }
}

export default ThreeClassSelect;
