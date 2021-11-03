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
    public class MyFavoriteRecipesController : ControllerBase
    {
        private readonly recipefinderContext _context;


        private UserManager<ApplicationUser> _userManager;

       
        public MyFavoriteRecipesController(recipefinderContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/MyFavoriteRecipes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MyFavoriteRecipe>>> GetMyFavoriteRecipes()
        {
            return await _context.MyFavoriteRecipes.ToListAsync();
        }

        [HttpGet("{userName}")]
        public async Task<ActionResult<IEnumerable<MyFavoriteRecipe>>> GetMyFavoriteRecipes(string username)
        {
            var user = _userManager.Users.FirstOrDefault(x => x.UserName == username);
            
            return await _context.MyFavoriteRecipes.Where(x => x.UserId == user.Id).ToListAsync();
        }

        // GET: api/MyFavoriteRecipes/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<MyFavoriteRecipe>> GetMyFavoriteRecipe(int id)
        //{
        //    var myFavoriteRecipe = await _context.MyFavoriteRecipes.FindAsync(id);

        //    if (myFavoriteRecipe == null)
        //    {
        //        return NotFound();
        //    }

        //    return myFavoriteRecipe;
        //}

        // PUT: api/MyFavoriteRecipes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMyFavoriteRecipe(int id, MyFavoriteRecipe myFavoriteRecipe)
        {
            if (id != myFavoriteRecipe.FavoritesId)
            {
                return BadRequest();
            }

            _context.Entry(myFavoriteRecipe).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MyFavoriteRecipeExists(id))
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

        // POST: api/MyFavoriteRecipes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MyFavoriteRecipe>> PostMyFavoriteRecipe(MyFavoriteRecipe myFavoriteRecipe)
        {
            _context.MyFavoriteRecipes.Add(myFavoriteRecipe);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMyFavoriteRecipe", new { id = myFavoriteRecipe.FavoritesId }, myFavoriteRecipe);
        }

        // DELETE: api/MyFavoriteRecipes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMyFavoriteRecipe(int id)
        {
            var myFavoriteRecipe = await _context.MyFavoriteRecipes.FindAsync(id);
            if (myFavoriteRecipe == null)
            {
                return NotFound();
            }

            _context.MyFavoriteRecipes.Remove(myFavoriteRecipe);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MyFavoriteRecipeExists(int id)
        {
            return _context.MyFavoriteRecipes.Any(e => e.FavoritesId == id);
        }
    }
}
