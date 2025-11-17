<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;
use App\Models\User;
use App\Models\Seo;
use App\Models\Hobbies;

class MediaController extends Controller
{

    public function uploadMedia(Request $request)
    {
        $modelName = $request->get('model');
        $id = $request->get('id');

        $model = match ($modelName) {
            'Blog' => Blog::findOrFail($id),
            'User'     => User::findOrFail($id),
            'Seo'  => Seo::findOrFail($id),
            'Hobbies' => Hobbies::findOrFail($id),
            default    => abort(415, 'Model does not support media'),
        };

        $formData = [];
        $existingFileIds = [];

        if ($request->has('form_data')) {
            $formData = json_decode($request->get('form_data'), true);
            $existingFileIds = collect($formData)->pluck('id')->filter()->toArray();

            $model->media()
                ->whereNotIn('id', $existingFileIds)
                ->get()
                ->each
                ->delete();
        } else {
            $model->clearMediaCollection('images');
        }

        $uploadedMedia = $this->processMedia($model, $request, $formData);

        return response()->json([
            'message' => 'Media processed successfully',
            'files' => $uploadedMedia,
        ]);
    }

    private function processMedia($model, Request $request, array $formData): array
    {
        $uploadedMedia = [];

        // Update existing media metadata (like is_standard)
        foreach ($formData as $meta) {
            if (!empty($meta['id'])) {
                $media = $model->media()->where('id', $meta['id'])->first();
                if ($media) {
                    if (isset($meta['is_standard'])) {
                        $media->setCustomProperty(
                            'is_standard',
                            filter_var($meta['is_standard'], FILTER_VALIDATE_BOOLEAN)
                        );
                        $media->save();
                    }

                    $uploadedMedia[] = [
                        'id' => $media->id,
                        'media_url' => $media->getUrl(),
                        'is_standard' => $media->getCustomProperty('is_standard', false),
                    ];
                }
            }
        }

        // Handle new uploads
        if ($request->hasFile('media')) {
            foreach ($request->file('media') as $index => $file) {
                $meta = $formData[$index] ?? [];
                $media = $model->addMedia($file)->toMediaCollection('images');

                if (isset($meta['is_standard'])) {
                    $media->setCustomProperty(
                        'is_standard',
                        filter_var($meta['is_standard'], FILTER_VALIDATE_BOOLEAN)
                    );
                    $media->save();
                }

                $uploadedMedia[] = [
                    'id' => $media->id,
                    'media_url' => $media->getUrl(),
                    'is_standard' => $media->getCustomProperty('is_standard', false),
                ];
            }
        }

        return $uploadedMedia;
    }
}
