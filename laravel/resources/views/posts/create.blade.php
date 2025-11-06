<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800">
            {{ __('Create New Post') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">

                    @if ($errors->any())
                        <div class="mb-4 alert alert-error">
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <form action="{{ route('posts.store') }}" method="POST">
                        @csrf
                        <div class="w-full mb-4 form-control">
                            <label class="label">
                                <span class="label-text">Title</span>
                            </label>
                            <input type="text" name="title" placeholder="Post Title"
                                class="w-full input input-bordered" value="{{ old('title') }}" required />
                        </div>

                        <div class="w-full mb-4 form-control">
                            <label class="label">
                                <span class="label-text">Content</span>
                            </label>
                            <textarea name="content" class="h-48 textarea textarea-bordered" placeholder="Post content..." required>{{ old('content') }}</textarea>
                        </div>

                        <div class="flex items-center gap-4">
                            <button type="submit" class="btn btn-primary">Save Post</button>
                            <a href="{{ route('posts.index') }}" class="btn btn-ghost">Cancel</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
