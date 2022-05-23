import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
    return axios.get("http://localhost:4000/superheroes");
}

const addSuperHero = (hero) => {
    return axios.post("http://localhost:4000/superheroes", hero)
}

export const useSuperHeroesData = (onSuccess, onError) => {
    return useQuery("super-heroes", fetchSuperHeroes,
        {
            onSuccess,
            onError,
            // select: (data) => {
            //     const superHeroNames = data.data.map((hero) => hero.name)
            //     return superHeroNames;
            // }
        });
}

export const useAddSuperHeroData = () => {
    const queryClient = useQueryClient();
    return useMutation(addSuperHero, {
        onSuccess: (data) => {
            // queryClient.invalidateQueries("super-heroes")        //refteches query once rendered as invalid, after posting method is successful
            queryClient.setQueryData("super-heroes", (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [...oldQueryData.data, data.data],       //updates list from local response without trigerring network call 
                }
            })
        }
    })
}