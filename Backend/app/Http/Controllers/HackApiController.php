<?php

namespace App\Http\Controllers;

use App\UserNew;
use GuzzleHttp\Client;
use App\FeedsNew;
use App\UsersTrace;
use App\UsersInfect;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class HackApiController extends Controller
{
    public function login (Request $request) {
    	Log::info($request);
		$user = UserNew::where('email', $request->email)->where('password', $request->password)->first();
	    Log::info($user);
	    if ($user != null) {
	        return response()->json($user, 201);}
	    else {
	        return response()->json([
	          "error" => "Invalid Email / Password"
	        ], 401);
		}
	}

    public function signup (Request $request) {
    	Log::info($request);
    	$data = [
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => $request->password,
    	];
    	$user = UserNew::create($data);
        $user->save();
        $this->addUsersTrace($user->user_id);
        return $user;
	}

	public function escapeJsonString($value) { 
	    $escapers = array("\'");
	    $replacements = array("\\/");
	    $result = str_replace($escapers, $replacements, $value);
	    return $result;
	}

	public function postFeed (Request $request) {
		
        try {

    	    $ch = curl_init();
		    $data = '{"text":"'.$request->comment.'","features":{"sentiment":{"targets":["covid"]},"keywords":{"emotion":true}}}';
		    Log::info($data);

		    // IBM NLP API
			curl_setopt($ch, CURLOPT_URL, 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/60f79d5f-dad1-4d8e-ad5b-7ee9a1e3a439/v1/analyze?version=2019-07-12');
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_POST, 1);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
			curl_setopt($ch, CURLOPT_USERPWD, 'apikey' . ':' . 'xxxxxxxxx');

			$headers = array();
			$headers[] = 'Content-Type: application/json';
			curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

			$result = curl_exec($ch);
			if (curl_errno($ch)) {
			    echo 'Error:' . curl_error($ch);
			}
			curl_close($ch);
			Log::info($result);

			$curl_response = $this->escapeJsonString($result);

			$curl_response = json_decode($result,true);

			Log::info($curl_response);
			//Log::info($curl_response);
			$is_danger = 0;
			if(isset($curl_response["sentiment"])) {
				if(isset($curl_response["sentiment"]["targets"])) {
					$resp = $curl_response["sentiment"]["targets"];
					
					if($resp[0]['label']=='positive' || $resp[0]['label']=='neutral') {
						$is_danger = 1;
						$this->mark_infected($request->user);
					}
				}
			}

			$data = [
	            'user' => $request->user,
	            'comment' => $request->comment,
	            'location' => $request->location,
	            'is_danger' => $is_danger,
	            'is_anonymous' => $request->is_anonymous,
        	];

            $feed = FeedsNew::create($data);
            $feed->save();
            return $feed;
        } 
        catch (QueryException $e) {
            Log::info('feed save exception : '.$e);
            return ['error' => 'Error in saving tweet'];
        }
	}

	public function getFeeds(Request $request) {
        $feeds = FeedsNew::get();
        $ids = array();
        foreach($feeds as $obj) {
        	array_push($ids,$obj->user);
        }
        $ids = array_unique($ids);
        $userinfo = UserNew::whereIn("user_id",$ids)->get();
        $map = array();
		foreach($userinfo as $obj) {
			$map[$obj->user_id] = $obj->first_name;
		}
		foreach($feeds as $obj) {
			$obj["name"]=$map[$obj->user];
		}
        return $feeds;
	}

	public function mark_infected($user_id) {
		try {
			$data = [
	            'user' => $user_id,
        	];
        	if(!(UsersInfect::where("user",$user_id)->exists())) {
				$inf = UsersInfect::create($data);
				$inf->save();
			}
		} catch (QueryException $e) {
			Log::info($e);
		}
	}

	public function getInfectedLatLong() {
		$users_infected = UsersInfect::get();
		$user_ids = array();
		foreach($users_infected as $obj) {
			array_push($user_ids,$obj->user);
		}
		$result = array();
		foreach($user_ids as $id) {
			$traces = UsersTrace::where("user",$id)->get();
			foreach($traces as $trace) {
				Log::info($trace);
				$map = array();
				$map["lat"] = $trace->lat;
				$map["long"] = $trace->long;
				$map["name"] = $trace->location;
				array_push($result,$map);
			}
		}
		return $result;
	}

	public function getSafePassDetails($user_id) {
		$result = array();
		if((UsersInfect::where("user",$user_id)->exists())) {
			$user_infected = UsersInfect::where("user",$user_id)->first();
			$traces = UsersTrace::where("user",$user_id)->get();
			Log::info($user_infected->created_at);
			$chk = $user_infected->created_at;
			Log::info(gettype($user_infected->created_at));
			$result["status"]="Danger";
			$result["infected_date"]=$chk;
			$result["traces"]=$traces;
		} else {
			$exist = UsersInfect::first();
			if(is_null($exist)){
				$result["status"]="Safe";
				$map = array();
				$map["date"] = date('Y-m-d H:i:s');
				$result["infected_date"]=$map;
				$result["traces"]=array();
			} else {
				$result["status"]="Warning";
				$map = array();
				$map["date"] = date('Y-m-d H:i:s');
				$result["infected_date"]=$map;
				$traces = UsersTrace::where("user",1)->get();
				$result["traces"]=$traces;
			}
		}
		return $result;
	}

	public function addUsersTrace($user_id) {
		$data = [
            'user' => $user_id,
            'lat' => 42.999050,
            'long' => -78.696071,
            'location' => "Franco's Pizza",
    	];
    	$user = UsersTrace::create($data);
        $user->save();

        $data = [
            'user' => $user_id,
            'lat' => 42.979838,
            'long' => -78.752032,
            'location' => "Niagara",
    	];
    	$user = UsersTrace::create($data);
        $user->save();

        $data = [
            'user' => $user_id,
            'lat' => 42.941019,
            'long' => -78.853656,
            'location' => "City",
    	];
    	$user = UsersTrace::create($data);
        $user->save();
	}

}