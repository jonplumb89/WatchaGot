using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project1.Models;

namespace Project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MyRecipesController : ControllerBase
    {
        private readonly recipefinderContext _context;

        private UserManager<ApplicationUser> _userManager;
        public MyRecipesController(recipefinderContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/MyRecipes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MyRecipe>>> GetMyRecipes()
        {
            return await _context.MyRecipes.ToListAsync();
        }

        [HttpGet("{userName}")]
        public async Task<ActionResult<IEnumerable<MyRecipe>>> GetMyRecipes(string username)
        {
            var user = _userManager.Users.FirstOrDefault(x => x.UserName == username);

            return await _context.MyRecipes.Where(x => x.UserId == user.Id).ToListAsync();
        }

        // GET: api/MyRecipes/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<MyRecipe>> GetMyRecipe(int id)
        //{
        //    var myRecipe = await _context.MyRecipes.FindAsync(id);

        //    if (myRecipe == null)
        //    {
        //        return NotFound();
        //    }

        //    return myRecipe;
        //}

        // PUT: api/MyRecipes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMyRecipe(int id, MyRecipe myRecipe)
        {
            if (id != myRecipe.RecipeId)
            {
                return BadRequest();
            }

            _context.Entry(myRecipe).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MyRecipeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/MyRecipes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MyRecipe>> PostMyRecipe(MyRecipe myRecipe)
        {
            _context.MyRecipes.Add(myRecipe);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMyRecipe", new { id = myRecipe.RecipeId }, myRecipe);
        }

        // DELETE: api/MyRecipes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMyRecipe(int id)
        {
            var myRecipe = await _context.MyRecipes.FindAsync(id);
            if (myRecipe == null)
            {
                return NotFound();
            }

            _context.MyRecipes.Remove(myRecipe);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MyRecipeExists(int id)
        {
            return _context.MyRecipes.Any(e => e.RecipeId == id);
        }
    }
}
