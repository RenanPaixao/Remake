import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Accordion = {
    title: string;
    content: string;
};

const Accordion: React.FC<Accordion> = ({ title, content }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleAccordion = () => {
        setExpanded(!expanded);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleAccordion}>
                <View style={styles.titlecontainer}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.buttons}>
                        {expanded ? (
                            <AntDesign name="minuscircleo" size={18} color="black" />
                        ) : (
                            <AntDesign name="pluscircleo" size={18} color="black" />
                        )}
                    </View>
                </View>
            </TouchableOpacity>
            {expanded && <Text style={styles.content}>{content}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D9D9D9',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    titlecontainer: {
        display: 'flex',
        flexDirection: 'row',
        height: 55,
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        width: 250,
        textAlign: 'left',
        paddingBottom:10,
        paddingRight: 10,
    },
    buttons: {
        paddingLeft: 20,
        paddingBottom:20,
        width: 40,

    },
    content: {
        marginTop: 5,
        color: 'black',
        textAlign: 'center',
    },
});

export default Accordion;
