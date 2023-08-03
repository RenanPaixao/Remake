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
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.title}>{expanded ? <AntDesign name="minuscircleo" size={5} color="black" /> : <AntDesign name="pluscircleo" size={5} color="black" />}</Text>
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
    title: {
        fontSize: 18,
        width: 300,
        textAlign: 'left',
    },
    content: {
        marginTop: 5,
        color: 'black',
        textAlign: 'center',
    },
});

export default Accordion;
