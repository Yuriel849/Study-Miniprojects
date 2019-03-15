package org.Yuriel.Youtube;

import java.io.IOException;
import java.util.List;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.LiveStream;
import com.google.api.services.youtube.model.LiveStreamListResponse;
import com.google.common.collect.Lists;

public class CheckStreamActive {
	
    /**
     * Define a global instance of a Youtube object, which will be used to make YouTube Data API requests.
     */
    private static YouTube youtube;

    /**
     * Confirm the active status of the user's video stream.
     *
     * @param args command line args (not used).
     */
    public static void main(String[] args) {

        // This OAuth 2.0 access scope allows for read-only access to the authenticated user's account,
    		// but not other types of account access.
        List<String> scopes = Lists.newArrayList("https://www.googleapis.com/auth/youtube.readonly");

        try {
            // Authorize the request.
            Credential credential = Auth.authorize(scopes, "listbroadcasts");

            // This object is used to make YouTube Data API requests.
            youtube = new YouTube.Builder(Auth.HTTP_TRANSPORT, Auth.JSON_FACTORY, credential).build();

            // Create a request to list broadcasts.
            YouTube.LiveStreams.List liveStreamRequest = youtube.liveStreams().list("id,status");
            liveStreamRequest.set("id", "hC3NQyai3AS9f0upFaYB4Q1552635528381558");

            // Execute the API request and return the list of broadcasts.
            LiveStreamListResponse returnedListResponse = liveStreamRequest.execute();
            List<LiveStream> returnedList = returnedListResponse.getItems();

            // Print information from the API response.
            System.out.println("\n================== Returned Broadcasts ==================\n");
            for (LiveStream stream : returnedList) {
                System.out.println("  - Id: " + stream.getId());
                System.out.println("  - Stream Status: " + stream.getStatus().getStreamStatus());
                System.out.println("\n-------------------------------------------------------------\n");
            }
        } catch (GoogleJsonResponseException e) {
            System.err.println("GoogleJsonResponseException code: "
            		+ e.getDetails().getCode() + " : " + e.getDetails().getMessage());
            e.printStackTrace();
        } catch (IOException e) {
            System.err.println("IOException: " + e.getMessage());
            e.printStackTrace();
        } catch (Throwable t) {
            System.err.println("Throwable: " + t.getMessage());
            t.printStackTrace();
        }
    }
}