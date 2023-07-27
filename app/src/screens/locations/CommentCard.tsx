import React from 'react'
import { StyleSheet } from 'react-native'
import {
  Avatar,
  Layout,
  Section,
  SectionContent,
  Text,
  TopNav
} from 'react-native-rapi-ui'
import { StarRatingDisplay } from 'react-native-star-rating-widget'
import { generateBoxShadowStyle } from '../../utils/styles'
interface IProfile {
  name: string
  img_url?: string
}

interface ICommentCardProps {
  profile: IProfile;
  comment?: string;
  avaliation?: number;
  id: string;
  created_at?: string;
}

<Layout>
  <TopNav middleContent="Home" />
</Layout>
export default function CommentCard(props: ICommentCardProps) {
  return (
    <Section style={[styles.container, styles.shadow]}
    >
      <SectionContent style={{ justifyContent: 'space-between' }}>
        <SectionContent padding={0} style={styles.headerContainer}>
          <SectionContent padding={0} style={styles.userDataContainer}>
            <Avatar
              source={{ uri: props.profile?.img_url || DEFAULT_IMAGE_URL }}
              size="sm"
              shape="round"
              style={{ marginRight: 5 }}
            />
            <Text> {props.profile.name} </Text>
          </SectionContent>
          <SectionContent padding={0} style={styles.userDataContainer}>
            {props?.avaliation ?
              <StarRatingDisplay starSize={25} rating={props.avaliation} starStyle={{ marginHorizontal: 0 }} />
              : <Text>Sem Avaliação!</Text>}
          </SectionContent>

        </SectionContent>

        {props?.comment && <SectionContent padding={0} style={{ paddingTop: 20 }}>
          <Text>{props.comment}</Text>
        </SectionContent>}

      </SectionContent>
    </Section>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#c0c0c0',
    width: 320,
    backgroundColor: '#D9D9D9'
  },
  shadow: generateBoxShadowStyle(-2, 4, 0.2, 3, 3),
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  userDataContainer: { flexDirection: 'row', alignItems: 'center' }
})

const DEFAULT_IMAGE_URL = 'https://upload.wikimedia.org/wikipedia/commons/2/2f/No-photo-m.png'