using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Project1.Services
{
    public class RecipesClient
    {
        private readonly HttpClient httpclient;

        public RecipesClient(HttpClient httpclient)
        {
            this.httpclient = httpclient;
        }

        public async Task<string> GetRecipeAsync()
        {
            try
            {
                var result = await httpclient.GetAsync("https://api.spoonacular.com/recipes/findByIngredients?apiKey=fa94bed73ee04f939a6b76d41a7a2a2c&ingredients=scallops,onions,pepper&number=2");
                var json = await result.Content.ReadAsStringAsync();
                return json;
            }
            catch (Exception)
            {
                //Special handle for angular case
                throw;
            }

        }

        public async Task<string> SearchRecipe()
        {
            return null;
        }


        //public async Task<Recipe> GetRecipeAsync()
        //{
        //    //use the http client to get the response
        //    var response = await _httpClient.GetAsync("");

        //    //grab the jason from the reponse content
        //    var jsonResponse = await response.Content.ReadAsStringAsync();

        //    //deserialize our json and converting it into our model
        //    var recipeRespone = JsonSerializer.Deserialize<Recipe>(jsonResponse);

        //    return recipeRespone;
        //}

    }
}
