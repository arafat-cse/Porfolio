<?php

namespace App\Providers;
use Flat3\Lodata\Facades\Lodata;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\App;
use App\Models\User;
use App\Models\Blog;
use App\Models\Catagory;
use App\Models\Seo;
use App\Models\Hobbies;
use App\Models\articale;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $isOdataRequest = request()->is(config('lodata.prefix') . "/*") || request()->is(config('lodata.prefix'));

        if (!App::runningInConsole() && $isOdataRequest) {
            Lodata::discover(User::class);
            Lodata::discover(Blog::class);
            Lodata::discover(Catagory::class);
            Lodata::discover(Seo::class);
            Lodata::discover(Media::class);
            Lodata::discover(Hobbies::class);
            Lodata::discover(articale::class);
        
            Lodata::getEntitySet('Users')->discoverRelationship('media');
            Lodata::getEntitySet('Seos')->discoverRelationship('media');
            Lodata::getEntitySet('Blogs')->discoverRelationship('media');
            Lodata::getEntitySet('Hobbies')->discoverRelationship('media');
            
    

        }
    }
}
