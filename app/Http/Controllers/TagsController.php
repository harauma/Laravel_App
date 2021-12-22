<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TagsController extends Controller
{
    /**
     * タグ全件取得処理
     */
    public function index(Request $request)
    {
        $tags = Tag::all();
        return view('tagSetting', ['tags' => $tags]);
    }

    /**
     * タグ作成処理
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tag_name' => 'required|max:15',
            'user_name' => 'required',
        ]);

        $tag = new Tag();
        $tag->tag_name = $request->input('tag_name');
        $tag->create_user_name = $request->input('user_name');
        $tag->save();

        return redirect()->route('tagSetting');
    }

    /**
     * タグ全件取得処理API
     */
    public function list()
    {
        try {
            $tags = Tag::all();
            if ($tags->isNotEmpty()) {
                return response()->json($tags, Response::HTTP_OK);
            } else {
                return response()->json([], Response::HTTP_NO_CONTENT);
            }
        } catch (\Throwable $e) {
            return response()->json([], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * タグ削除処理
     */
    public function destroy($id)
    {
        Tag::destroy($id);
        $tags = Tag::all();
        return redirect()->route('tagSetting');
    }
}
