using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Project1.Models
{
    public partial class recipefinderContext : DbContext
    {
        public recipefinderContext()
        {
        }

        public recipefinderContext(DbContextOptions<recipefinderContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AspNetRole> AspNetRoles { get; set; }
        public virtual DbSet<AspNetRoleClaim> AspNetRoleClaims { get; set; }
        public virtual DbSet<AspNetUser> AspNetUsers { get; set; }
        public virtual DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }
        public virtual DbSet<AspNetUserLogin> AspNetUserLogins { get; set; }
        public virtual DbSet<AspNetUserRole> AspNetUserRoles { get; set; }
        public virtual DbSet<AspNetUserToken> AspNetUserTokens { get; set; }
        public virtual DbSet<DeviceCode> DeviceCodes { get; set; }
        public virtual DbSet<MyFavoriteRecipe> MyFavoriteRecipes { get; set; }
        public virtual DbSet<MyRecipe> MyRecipes { get; set; }
        public virtual DbSet<PersistedGrant> PersistedGrants { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=whatchagot.database.windows.net;Database=recipefinder;User Id=whatchagot;Password=FinalProject123;MultipleActiveResultSets=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<AspNetRole>(entity =>
            {
                entity.HasIndex(e => e.NormalizedName, "RoleNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedName] IS NOT NULL)");

                entity.Property(e => e.Name).HasMaxLength(256);

                entity.Property(e => e.NormalizedName).HasMaxLength(256);
            });

            modelBuilder.Entity<AspNetRoleClaim>(entity =>
            {
                entity.HasIndex(e => e.RoleId, "IX_AspNetRoleClaims_RoleId");

                entity.Property(e => e.RoleId).IsRequired();

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AspNetRoleClaims)
                    .HasForeignKey(d => d.RoleId);
            });

            modelBuilder.Entity<AspNetUser>(entity =>
            {
                entity.HasIndex(e => e.NormalizedEmail, "EmailIndex");

                entity.HasIndex(e => e.NormalizedUserName, "UserNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedUserName] IS NOT NULL)");

                entity.Property(e => e.Email).HasMaxLength(256);

                entity.Property(e => e.NormalizedEmail).HasMaxLength(256);

                entity.Property(e => e.NormalizedUserName).HasMaxLength(256);

                entity.Property(e => e.UserName).HasMaxLength(256);
            });

            modelBuilder.Entity<AspNetUserClaim>(entity =>
            {
                entity.HasIndex(e => e.UserId, "IX_AspNetUserClaims_UserId");

                entity.Property(e => e.UserId).IsRequired();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserClaims)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserLogin>(entity =>
            {
                entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });

                entity.HasIndex(e => e.UserId, "IX_AspNetUserLogins_UserId");

                entity.Property(e => e.LoginProvider).HasMaxLength(128);

                entity.Property(e => e.ProviderKey).HasMaxLength(128);

                entity.Property(e => e.UserId).IsRequired();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserLogins)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserRole>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.RoleId });

                entity.HasIndex(e => e.RoleId, "IX_AspNetUserRoles_RoleId");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AspNetUserRoles)
                    .HasForeignKey(d => d.RoleId);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserRoles)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserToken>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });

                entity.Property(e => e.LoginProvider).HasMaxLength(128);

                entity.Property(e => e.Name).HasMaxLength(128);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserTokens)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<DeviceCode>(entity =>
            {
                entity.HasKey(e => e.UserCode);

                entity.HasIndex(e => e.DeviceCode1, "IX_DeviceCodes_DeviceCode")
                    .IsUnique();

                entity.HasIndex(e => e.Expiration, "IX_DeviceCodes_Expiration");

                entity.Property(e => e.UserCode).HasMaxLength(200);

                entity.Property(e => e.ClientId)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Data).IsRequired();

                entity.Property(e => e.Description).HasMaxLength(200);

                entity.Property(e => e.DeviceCode1)
                    .IsRequired()
                    .HasMaxLength(200)
                    .HasColumnName("DeviceCode");

                entity.Property(e => e.SessionId).HasMaxLength(100);

                entity.Property(e => e.SubjectId).HasMaxLength(200);
            });

            modelBuilder.Entity<MyFavoriteRecipe>(entity =>
            {
                entity.HasKey(e => e.FavoritesId)
                    .HasName("PK__MyFavori__0E6777B5A0EF13D9");

                entity.Property(e => e.Ingredients)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Instructions)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.RecipeId).HasColumnName("RecipeID");

                entity.Property(e => e.Summary)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.UserId)
                    .HasMaxLength(450)
                    .HasColumnName("User_ID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.MyFavoriteRecipes)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__MyFavorit__User___05D8E0BE");
            });

            modelBuilder.Entity<MyRecipe>(entity =>
            {
                entity.HasKey(e => e.RecipeId)
                    .HasName("PK__MyRecipe__FDD988D0D9DC794F");

                entity.Property(e => e.RecipeId).HasColumnName("RecipeID");

                entity.Property(e => e.Ingredients)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Instructions)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Summary)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.UserId)
                    .HasMaxLength(450)
                    .HasColumnName("User_ID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.MyRecipes)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__MyRecipes__User___08B54D69");
            });

            modelBuilder.Entity<PersistedGrant>(entity =>
            {
                entity.HasKey(e => e.Key);

                entity.HasIndex(e => e.Expiration, "IX_PersistedGrants_Expiration");

                entity.HasIndex(e => new { e.SubjectId, e.ClientId, e.Type }, "IX_PersistedGrants_SubjectId_ClientId_Type");

                entity.HasIndex(e => new { e.SubjectId, e.SessionId, e.Type }, "IX_PersistedGrants_SubjectId_SessionId_Type");

                entity.Property(e => e.Key).HasMaxLength(200);

                entity.Property(e => e.ClientId)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Data).IsRequired();

                entity.Property(e => e.Description).HasMaxLength(200);

                entity.Property(e => e.SessionId).HasMaxLength(100);

                entity.Property(e => e.SubjectId).HasMaxLength(200);

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
