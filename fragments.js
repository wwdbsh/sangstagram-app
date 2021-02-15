import { gql } from "apollo-boost";

export const POST_FRAGMENT = gql`
    fragment PostParts on Post {
        id
        locations
        caption
        user {
            id
            avatar
            username
        }
        files {
            id
            url
        }
        likeCount
        isLiked
        comments {
            id
            text
            user {
                id
                username
            }
        }
        createdAt
    }
`;