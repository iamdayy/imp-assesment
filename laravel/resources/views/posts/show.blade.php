<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800">
            {{ $post->title }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">

                    <div class="prose max-w-none">
                        <p>{{ $post->content }}</p>
                    </div>

                    <div class="mt-4 text-sm text-gray-500">
                        Created on {{ $post->created_at->format('M d, Y') }}
                    </div>

                    <div class="flex items-center gap-4 mt-6">
                        <a href="{{ route('posts.edit', $post) }}" class="btn btn-warning">Edit Post</a>
                        <a href="{{ route('posts.index') }}" class="btn btn-ghost">Back to List</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
