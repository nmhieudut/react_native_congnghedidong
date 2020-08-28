import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup'
import { SafeAreaView } from 'react-native-safe-area-context';


const schema = Yup.object().shape({
    a: Yup.number()
        .min(0)
        .required('a is required'),
    b: Yup.number()
        .required('b is required'),
    c: Yup.number()
        .required('c is equired'),
});
export default function HomeScreen({ navigation }) {
    // const [count, setCount] = useState(0);
    const [arr, setArr] = useState([]);
    // const addToHistory = () => {
    //     setCount(count + 1);
    //     const newArr = [...arr];
    //     newArr.push(count);
    //     setArr(newArr);
    // }
    // const renderItem = ({ item }) => {
    //     return (
    //         <TouchableOpacity style={{ width: 410, borderWidth: 0.5, alignItems: 'center', justifyContent: 'center' }}
    //             onPress={() => navigation.navigate("Detail", { count: item })}
    //             onLongPress={() => {
    //                 const newArr = arr.filter(x => x !== item)
    //                 setArr(newArr);
    //             }}>
    //             <View>
    //                 <Text style={{ fontSize: 30 }}>{item}</Text>
    //             </View>
    //         </TouchableOpacity>
    //     )
    // }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={{ padding: 50, borderWidth: 0.2 }}
                onPress={() => navigation.navigate('Detail', { result: item })}
            >
                <Text style={{ fontSize: 20 }}>{item}</Text>
            </TouchableOpacity>
        )
    }
    const solve = (values) => {
        var [a, b, c] = [values.a, values.b, values.c]
        var result = '';
        var delta = ((b * b) - (4 * a * c));
        if (a == 0) {
            result = "phuong trinh co nghiem x = " + (-c / b);
        }
        else {
            if (delta == 0) {
                result = "phuong trinh co nghiem kep x1 = x2 = " + (-b / 2 / a) + " ";
            }
            else {
                if (delta > 0) {
                    result = "phuong trinh co nghiem x1 = " + ((-b - Math.sqrt(delta)) / 2 / a) + ", x2 = " + ((-b + Math.sqrt(delta)) / 2 / a) + " ";
                }
                else {
                    result = "phuong trinh vo nghiem";
                }
            }
        }
        const newArr = [...arr];
        newArr.unshift(result);
        setArr(newArr);
    }
    const deleteAll = () => {
        setArr([])
    }
    return (
        <View>
            <View style={{ marginTop: 30 }}>
                {/* <FlatList
                data={arr}
                renderItem={renderItem}
                keyExtractor={(item, index) => `service-${index}`}
            />
            <Button title="Press me"
                onPress={addToHistory}
            /> */}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30 }}>Giai phuong trinh bac 2</Text>
                </View>
                <Formik
                    initialValues={{
                        a: '',
                        b: '',
                        c: ''
                    }}
                    validationSchema={schema}
                    onSubmit={values => solve(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <View style={{ width: 410, paddingTop: 30, paddingHorizontal: 10 }}>
                            <Input
                                keyboardType="phone-pad"
                                label="Enter a"
                                labelStyle={{ color: 'blue' }}
                                onBlur={handleBlur('a')}
                                value={values.a}
                                onChangeText={handleChange('a')}
                                placeholder='Enter a'
                                inputContainerStyle={{ color: 'black', fontSize: 18 }}
                                errorStyle={{ color: 'red', fontSize: 16 }}
                                errorProps={errors.a}
                                errorMessage={errors.a}
                            />
                            <Input
                                keyboardType="phone-pad"
                                label="Enter b"
                                labelStyle={{ color: 'blue' }}
                                onBlur={handleBlur('b')}
                                value={values.b}
                                onChangeText={handleChange('b')}
                                placeholder='Enter b'
                                inputContainerStyle={{ color: 'black', fontSize: 18 }}
                                errorStyle={{ color: 'red', fontSize: 16 }}
                                errorProps={errors.b}
                                errorMessage={errors.b}
                            />
                            <Input
                                keyboardType="phone-pad"
                                label="Enter c"
                                labelStyle={{ color: 'blue' }}
                                onBlur={handleBlur('c')}
                                value={values.c}
                                onChangeText={handleChange('c')}
                                placeholder='Enter c'
                                inputContainerStyle={{ color: 'black', fontSize: 18 }}
                                errorStyle={{ color: 'red', fontSize: 16 }}
                                errorProps={errors.c}
                                errorMessage={errors.c}
                            />
                            <Button onPress={handleSubmit} title="Solve" />
                            <Button type="clear" onPress={deleteAll} title="Delete All" />
                        </View>
                    )}
                </Formik>
            </View>
            <FlatList
                data={arr}
                renderItem={renderItem}
                keyExtractor={(item, index) => `service-${index}`}
            />
        </View>

    )
}
