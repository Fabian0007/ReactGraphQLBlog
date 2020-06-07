import axios from 'axios';
const GraphQLEndPoint = 'https://graphfront.com/api/graph/uc5f6582ef7a75430661a23160c8293b84129231b44dc5586';
const GraphQLApiKey = 'kf1a632ab52434515b07d';
import Blog, { BlogGraphQL } from './components/Blog';
export const sendOperation = (operationName: string, variables={}) => {
  return axios.post(GraphQLEndPoint, {
    query: BlogGraphQL,
    variables: {
      ...variables,
      apiKey: GraphQLApiKey,
    },
    operationName,
  }).then(resp => {
    const GraphQLData = resp.data.data;
    if (GraphQLData.viewer) {
      return GraphQLData.viewer.data;
    }
    return GraphQLData.mutationData;
  });
};