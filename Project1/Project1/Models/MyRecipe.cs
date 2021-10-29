using System;
using System.Collections.Generic;

#nullable disable

namespace Project1.Models
{
    public partial class MyRecipe
    {
        public int RecipeId { get; set; }
        public string UserId { get; set; }
        public string Title { get; set; }
        public int? ReadyInMinutes { get; set; }
        public string Summary { get; set; }
        public int? Servings { get; set; }
        public string Instructions { get; set; }
        public string Ingredients { get; set; }

        public virtual AspNetUser User { get; set; }
    }
}
